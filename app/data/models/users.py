from flask import current_app
from werkzeug.security import generate_password_hash, check_password_hash
from app import db,login
from flask_login import UserMixin
from app.data.models.carts import Carts
from app.data.models.items import Items
from app.data.models.roles import Roles, UserRoles
from app.data.models.availableVendors import AvailableVendors, UserVendors
from time import time
import jwt
from datetime import datetime

class Users(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    carts = db.relationship('Carts', backref='user', lazy='dynamic')
    activeCart = db.Column(db.Integer)
    roles = db.relationship('Roles', secondary='user_roles', backref=db.backref('users', lazy='dynamic'))
    created_date = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return '<User {}>'.format(self.username)
    @property
    def cart_count(self):
        return Carts.query.get(self.activeCart).items.count()
        
    @property
    def cart_name(self):
        return Carts.query.get(self.activeCart).name

    @property
    def items_in_cart(self):
        return Items.query.filter_by(cart_fk=self.activeCart).all()
    
    @property
    def totalPrice(self):
        return Carts.query.get(self.activeCart).totalPrice

    def validate_username(self, username):
        user = Users.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Please use a different username.')

    def validate_email(self, email):
        user = Users.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email address.')

    def get_id(self):
        return self.id

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def setCart(self, cart_id):
        self.activeCart = cart_id
        db.session.commit()

    def has_roles(self, *args):
        return set(args).issubset({role.name for role in self.roles})

    def get_reset_password_token(self, expires_in=600):
        return jwt.encode(
            {'reset_password': self.id, 'exp': time() + expires_in},
            current_app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')

    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, current_app.config['SECRET_KEY'],
                            algorithms=['HS256'])['reset_password']
        except:
            return
        return Users.query.get(id)

@login.user_loader
def load_user(id):
    return Users.query.get(int(id))

