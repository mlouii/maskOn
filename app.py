from flask import Flask, render_template, request
from flask_jsonpify import jsonify
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
import json
import psycopg2
from psycopg2.extras import RealDictCursor
import random
import string
conn = psycopg2.connect(user ="postgres",password = "sudoadmin",host = "localhost",port = "5432",database ="postgres")
cursor = conn.cursor(cursor_factory=RealDictCursor)
app= Flask(__name__)
api = Api(app)
cors = CORS(app)

#Pull all items from the database
class Inventory(Resource):
    def get():
        selecting = "SELECT * FROM inventory natural join model"
        cursor.execute(selecting)
        records = cursor.fetchall()
        return json.dumps(records, indent=2)
#Pull an item's info the database
class Model(Resource):
    def get(modNum):
        selecting = "SELECT * FROM model where modelnumber =  '" + str(modNum) + "'"
        cursor.execute(selecting)
        records = cursor.fetchall()
        return json.dumps(records, indent=2)
#Get user information
class users(Resource):
    def get(userID):
        selecting = "SELECT * FROM login natural join address natural join customer where userid = '" + str(userID)+"'"
        cursor.execute(selecting)
        records = cursor.fetchall()
        return json.dumps(records, indent=2)
#Pull all items from the users cart
class Cart(Resource):
    def get(cusID):
        selecting = "SELECT * FROM orders WHERE customerID = '" + str(cusID) + "'"
        cursor.execute(selecting)
        records = cursor.fetchall()
        return json.dumps(records)

#not sure if you want anything returned
def addToCart(cusID, empID, itemID, cost,quantity, time,orderNumber):
    randVal = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(6)])
    insert = "INSERT INTO orders VALUES ('" + str(randVal) + "','" + str(cusID) + "','" + str(empID) + "','" +  str(itemID) + "','" + str(cost) + "','" + str(quantity) + "','" + str(time)+ "','" + str(orderNumber) + "')"
    cursor.execute(insert)
    conn.commit()
    return Cart.get(cusID)

#landing page
@app.route("/")
def index():
    return jsonify({"hello mark": "Lets get thsi bread"})
#What happens when you load the marketplace
@app.route("/items")
def items():
    return Inventory.get()
#login checker, returns yes if password matches and no if not
@app.route("/auth", methods=['post'])
def auth():
    content = request.json
    print("PRINTING!!!!!!!!!")
    print(request)
    print(content)
    selecting = "SELECT * FROM login WHERE userid = " + "'"+str(content['username'])+"' AND password = '"+str(content['password'])+"'"
    cursor.execute(selecting)
    records = cursor.fetchall()
    if len(records) != 0:
        return jsonify({'response':True})
    else:
        return jsonify({'response':False})
@app.route("/auth/engineer",  methods = ['POST', 'GET'])
def engineer():
    if request.method =='GET':
        selecting = "SELECT * from model"
        cursor.execute(selecting)
        records = cursor.fetchall()
        return json.dumps(records)
    else:
        content = request.json
        insert = "INSERT INTO model VALUES ('" + str(content['saleprice']) + "','" + str(content['manufactureddate']) + "','" + str(content['imageurl']) + "','" +  str(content['description']) + "','" +  str(content['modeltype']) + "','" +  str(content['modelnumber'])+ "')"
        cursor.execute(insert)
        conn.commit()
        selecting = "SELECT * from model"
        cursor.execute(selecting)
        records = cursor.fetchall()
        return json.dumps(records)
#Sales Page
@app.route("/auth/sales",  methods = ['POST', 'GET'])
def sales():
    if request.method =='GET':
        selecting = "select * from orders;"
        cursor.execute(selecting)
        records = cursor.fetchall()
        return json.dumps(records)
    else:
        content = request.json
        insert = "INSERT INTO orders VALUES ('" + str(ordernumber) + "','" + str(customerid) + "','" + str(employeeid) + "','" +  str(modelnumber) + "','" +  str(salevalue)+ "','" +  str(quantity)+ "','" +  str(timedate)+ "')"
        cursor.execute(insert)
        conn.commit()
        selecting = "SELECT * from orders"
        cursor.execute(selecting)
        records = cursor.fetchall()
        return json.dumps(records)
#HR Page
@app.route("/auth/HR",  methods = ['POST', 'GET'])
def hr():
    if request.method =='GET':
        selecting = "SELECT * from employee"
        cursor.execute(selecting)
        records = cursor.fetchall()
        return json.dumps(records)
    else:
        content = request.json
        insert = "INSERT INTO employee VALUES ('" + str(content['employeeid']) + "','" + str(content['ssn']) + "','" + str(content['lastname']) + "','" +  str(content['middlename']) + "','" +  str(content['firstname'])+ "','" +  str(content['sex'])+ "'," +  str(content['dob'])+ "," +str(content['salary'])+ ",'" +str(content['typeofpay'])+ "','" +str(content['jobtype'])+ "','" + str(content['jobtitle'])+"')"
        cursor.execute(insert)
        conn.commit()
        selecting = "SELECT * from employee"
        cursor.execute(selecting)
        records = cursor.fetchall()
        return json.dumps(records)
#modelbought Page
@app.route("/ModelsBought")
def MB():
    selecting = "SELECT * from modelbought"
    cursor.execute(selecting)
    records = cursor.fetchall()
    return json.dumps(records)
#partsandinventory Page
@app.route("/PartsAndInventory")
def PAI():
    selecting = "SELECT * from partsandinventory"
    cursor.execute(selecting)
    records = cursor.fetchall()
    return json.dumps(records)
#totalrevenue Page
@app.route("/totalrevenue")
def TR():
    selecting = "SELECT * from totalrevenue"
    cursor.execute(selecting)
    records = cursor.fetchall()
    return json.dumps(records)
#viewexpensereport Page
@app.route("/viewexpensereport")
def VER():
    selecting = "SELECT * from viewexpensereport"
    cursor.execute(selecting)
    records = cursor.fetchall()
    return json.dumps(records)
#user info
@app.route("/auth/<userID>", methods=['get'])
def auth2(userID):
    return users.get(userID);
#The orders. When placing an order, return all orders + new one
@app.route("/<userID>/orders", methods = ['POST', 'GET'])
def orders(userID):
    if request.method == 'POST':
        content = request.json
        print(content)
        return addToCart(userID, content['empID'], content['Items']['id'], content['saleValue'], content['Items']['quantity'], content['timeDate'], content['orderNumber'])
    if request.method == 'GET':
        return Cart.get(userID)
#When the user
@app.route("/items/<itemID>", methods=['patch','get'])
def cart(itemID):
    content = request.json
    if content:
        print('yuh')
        change = "update inventory set availableinventory = " + str(content['availableQuantity']) + " where modelnumber = " + "'"+str(itemID)+"'"
        cursor.execute(change)
        conn.commit()
    return Model.get(itemID);
#When the user clicks add to cart
@app.route("/addtocart", methods=['post'])
def addtocart():
    cusID = request.form['cusID']
    empID = request.form['empID']
    itemID = request.form['itemID']
    cost = request.form['cost']
    quantity = request.form['quantity']
    addToCart(cusID,empID,itemID,cost,quantity)
#main driver
if __name__ == "__main__":
    app.run(debug=True)
