from flask import redirect, jsonify, request, url_for, session, render_template
from app.main import application
from flask_login import login_required, current_user
from app.main.punchout import processPunchoutOrder
# from app.data.models.items import Items
# from app.data.models.vendors import Vendors
# from app.data.models.carts import Carts
# from app.data.models.availableVendors import AvailableVendors, UserVendors
# from app import db
import json, requests
# import urllib.request
# from urllib.error import HTTPError
# from werkzeug.urls import url_parse
# from operator import getitem
# from app.main.items import addToCartWithVendor


@application.route("/processCheckout", methods= ['POST'])
def processCheckout():
    data = request.get_json()
    if 'url' in session.keys():
        session['cart'] = data['cart']
        session['total'] = data['total']
        return jsonify(url_for('main.punchoutCheckout'))
    else:
        return jsonify(url_for('main.directCheckout'))

@application.route("/punchoutCheckout")
def punchoutCheckout():
    punchoutOrderMessage = processPunchoutOrder()
    url = session['url']
    return render_template('checkout/punchoutCheckout.html', punchoutOrderMessage=punchoutOrderMessage, url=url)

@application.route("/directCheckout")
def directCheckout():
    return render_template('checkout/directCheckout.html')