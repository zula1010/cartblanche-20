var GN="3",HN="Any",IN="Aromatic",JN="Nonring",KN="Reset",LN="Ring";function MN(){MN=s;NN=new eo(Uc,new ON)}function ON(){}r(191,188,{},ON);_.Pc=function(a){Dv();gK(this,a.b,PN(a.a.a,a.a.a.ob.selectedIndex))};_.Sc=function(){return NN};var NN;function QN(a,b){if(0>b||b>=a.ob.options.length)throw new Fs;}function PN(a,b){QN(a,b);return a.ob.options[b].value}function RN(){this.ob=$doc.createElement("select");this.ob[cd]="gwt-ListBox"}r(336,314,th,RN);function SN(){SN=s}
function TN(a,b){if(null==b)throw new Gp("Missing message: awt.103");var c=-1,d,e,f;f=a.mc.a.ob;e=$doc.createElement(kf);e.text=b;e.removeAttribute("bidiwrapped");e.value=b;d=f.options.length;(0>c||c>d)&&(c=d);c==d?f.add(e,null):(c=f.options[c],f.add(e,c))}function UN(){SN();Cv.call(this);new qi;this.mc=new VN((Dv(),this))}r(401,388,{89:1,91:1,98:1,110:1,116:1},UN);_.Yd=function(){return Hv(this.mc,this)};
_.le=function(){return(null==this.jc&&(this.jc=ov(this)),this.jc)+va+this.uc+va+this.vc+va+this.rc+Fg+this.hc+(this.qc?l:",hidden")+",current="+PN(this.mc.a,this.mc.a.ob.selectedIndex)};function WN(){EJ.call(this,7)}r(414,1,ph,WN);function XN(a){GJ.call(this,a,0)}r(419,388,Vh,XN);r(545,543,Fh);_.Lc=function(){!this.a.Ib?this.a.Ib=new YN(this.a):this.a.Ib.mc.c.gb?VK(this.a.Ib.mc.c):bK(this.a.Ib)};function ZN(a,b){QI(b)==a.a?Z(b,(mw(),vw)):Z(b,a.a)}
function $N(a){var b,c,d,e;e=l;d=!1;QI(aO)!=a.a?(e=ta,d=!0):QI(bO)!=a.a?(e="!#6",d=!0):QI(cO)!=a.a?(Z(dO,(mw(),vw)),Z(lO,vw),Z(mO,vw),Z(nO,vw),e="F,Cl,Br,I"):(b=QI(oO)!=a.a,c=QI(pO)!=a.a,QI(qO)!=a.a&&(b?e+="c,":c?e+="C,":e+="#6,"),QI(rO)!=a.a&&(b?e+="n,":c?e+="N,":e+="#7,"),QI(sO)!=a.a&&(b?e+="o,":c?e+="O,":e+="#8,"),QI(tO)!=a.a&&(b?e+="s,":c?e+="S,":e+="#16,"),QI(uO)!=a.a&&(b?e+="p,":c?e+="P,":e+="#15,"),QI(dO)!=a.a&&(e+="F,"),QI(lO)!=a.a&&(e+="Cl,"),QI(mO)!=a.a&&(e+="Br,"),QI(nO)!=a.a&&(e+="I,"),
nC(e,va)&&(e=e.substr(0,e.length-1-0)),1>e.length&&!a.b&&(b?e=mc:c?e=nb:(Z(aO,(mw(),vw)),e=ta)));b=l;d&&QI(oO)!=a.a&&(b+=";a");d&&QI(pO)!=a.a&&(b+=";A");QI(vO)!=a.a&&(b+=";R");QI(wO)!=a.a&&(b+=";!R");QI(aO)!=a.a&&0<b.length?e=b.substr(1,b.length-1):e+=b;d=xO.mc.a.ob.selectedIndex;0<d&&(--d,e+=";H"+d);d=yO.mc.a.ob.selectedIndex;0<d&&(--d,e+=";D"+d);QI(zO)!=a.a&&(e="~");QI(AO)!=a.a&&(e=db);QI(BO)!=a.a&&(e=mb);QI(CO)!=a.a&&(e="!@");JJ(a.e,e)}
function DO(a){EO(a);FO(a);var b=xO.mc.a;QN(b,0);b.ob.options[0].selected=!0;b=yO.mc.a;QN(b,0);b.ob.options[0].selected=!0;Z(oO,a.a);Z(pO,a.a);Z(vO,a.a);Z(wO,a.a);Z(xO,a.a);Z(yO,a.a);GO(a)}function EO(a){Z(qO,a.a);Z(rO,a.a);Z(sO,a.a);Z(tO,a.a);Z(uO,a.a);Z(dO,a.a);Z(lO,a.a);Z(mO,a.a);Z(nO,a.a)}function FO(a){Z(aO,a.a);Z(bO,a.a);Z(cO,a.a)}function GO(a){Z(zO,a.a);Z(AO,a.a);Z(BO,a.a);Z(CO,a.a);a.b=!1}
function YN(a){xJ.call(this,"Atom/Bond Query");this.i=new qJ(this.dg());fw(this.q,new eK(this));this.a=(sy(),uy);this.c=a;this.d||(a=rv(a),this.d=new IJ(a),aK(this.d,-150,10));this.j=this.d;Qv(this,new WN);Z(this,this.a);a=new Vv;Qv(a,new Mw(0,3,1));$(a,new XN("Atom type :"),null);aO=new qJ(HN);bO=new qJ("Any except C");cO=new qJ("Halogen");$(a,aO,null);$(a,bO,null);$(a,cO,null);$(this,a,null);a=new Vv;Qv(a,new Mw(0,3,1));$(a,new GJ("Or select one or more from the list :",0),null);$(this,a,null);
a=new Vv;Qv(a,new Mw(0,3,1));qO=new qJ(qb);rO=new qJ(Lb);sO=new qJ(Rb);tO=new qJ(Yb);uO=new qJ(Sb);dO=new qJ(yb);lO=new qJ(tb);mO=new qJ(pb);nO=new qJ(Gb);$(a,qO,null);$(a,rO,null);$(a,sO,null);$(a,tO,null);$(a,uO,null);$(a,dO,null);$(a,lO,null);$(a,mO,null);$(a,nO,null);$(this,a,null);a=new Vv;Qv(a,new Mw(0,3,1));xO=new UN;TN(xO,HN);TN(xO,Ya);TN(xO,$a);TN(xO,cb);TN(xO,GN);$(a,new XN("Number of hydrogens :  "),null);$(a,xO,null);$(this,a,null);a=new Vv;Qv(a,new Mw(0,3,1));yO=new UN;TN(yO,HN);TN(yO,
Ya);TN(yO,$a);TN(yO,cb);TN(yO,GN);TN(yO,"4");TN(yO,"5");TN(yO,"6");$(a,new GJ("Number of connections :",0),null);$(a,yO,null);$(a,new GJ(" (H's don't count.)",0),null);$(this,a,null);a=new Vv;Qv(a,new Mw(0,3,1));$(a,new XN("Atom is :"),null);oO=new qJ(IN);$(a,oO,null);pO=new qJ("Nonaromatic");$(a,pO,null);vO=new qJ(LN);$(a,vO,null);wO=new qJ(JN);$(a,wO,null);$(this,a,null);a=new Vv;Z(a,Cw(QI(this)));Qv(a,new Mw(0,3,1));$(a,new XN("Bond is :"),null);zO=new qJ(HN);$(a,zO,null);AO=new qJ(IN);$(a,AO,
null);BO=new qJ(LN);$(a,BO,null);CO=new qJ(JN);$(a,CO,null);$(this,a,null);a=new Vv;Qv(a,new Mw(1,3,1));this.e=new rx(ta,20);$(a,this.e,null);$(a,new qJ(KN),null);$(a,this.i,null);$(this,a,null);this.mc&&zJ(this.mc.c,!1);wJ(this,!1);EO(this);FO(this);GO(this);Z(oO,this.a);Z(pO,this.a);Z(vO,this.a);Z(wO,this.a);Z(xO,this.a);Z(yO,this.a);ZN(this,aO);vJ(this);a=this.j;cK(this.mc.c,a.a,a.b);!qv(this)&&ZI(this);UI(this)}r(555,537,uF,YN);
_.eg=function(a,b){var c;H(b,KN)?(DO(this),ZN(this,aO),$N(this)):E(a.f,88)?(GO(this),nq(a.f)===nq(aO)?(EO(this),FO(this)):nq(a.f)===nq(bO)?(EO(this),FO(this)):nq(a.f)===nq(cO)?(EO(this),FO(this)):nq(a.f)===nq(vO)?Z(wO,this.a):nq(a.f)===nq(wO)?(Z(vO,this.a),Z(oO,this.a)):nq(a.f)===nq(oO)?(Z(pO,this.a),Z(wO,this.a)):nq(a.f)===nq(pO)?Z(oO,this.a):nq(a.f)===nq(zO)||nq(a.f)===nq(AO)||nq(a.f)===nq(BO)||nq(a.f)===nq(CO)?(DO(this),this.b=!0):FO(this),ZN(this,a.f),$N(this)):E(a.f,89)&&(GO(this),c=a.f,0==c.mc.a.ob.selectedIndex?
Z(c,this.a):Z(c,(mw(),vw)),$N(this));107!=this.c.e&&(this.c.e=107,$v(this.c));return!0};_.fg=function(){return Am(this.e.mc.a.ob,wg)};_.gg=function(){return this.b};_.b=!1;_.c=null;_.d=null;var aO=_.e=null,zO=null,bO=null,oO=null,AO=null,mO=null,qO=null,yO=null,xO=null,lO=null,dO=null,cO=null,nO=null,rO=null,pO=null,wO=null,CO=null,sO=null,uO=null,vO=null,BO=null,tO=null;function VN(a){xE();zE.call(this);this.a=new RN;ms(this.a,new HO(this,a),(MN(),MN(),NN))}r(601,599,{},VN);_.Fe=function(){return this.a};
_.a=null;function HO(a,b){this.a=a;this.b=b}r(602,1,{},HO);_.a=null;_.b=null;Y(555);Y(401);Y(601);Y(602);Y(336);Y(191);y(nF)(3);