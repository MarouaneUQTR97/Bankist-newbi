from flask import Flask, make_response,request,render_template,jsonify,abort
import json
import mysql.connector
from datetime import date

myDb=mysql.connector.connect(
    host='localhost',
    user='root',
    passwd='1997',
    database='bankistt'
)

mycursor=myDb.cursor()
today=date.today()


app=Flask(__name__)

@app.route('/')
def login():
    return render_template('index.html')

@app.route('/register',methods=['GET','POST'])
def register():
    # Creating Client
    if request.method=='POST':
        data=request.get_json()
        mysqlFormula=("INSERT INTO client(First_Name,Last_Name,Date_Of_Birth,Email,Passwd,Gender,Status) VALUES(%s,%s,%s,%s,%s,%s,%s)")
        dataInser=(data.get('_firstName'),data.get('_lasName'),data.get('_dateOfBirth'),data.get('_email'),data.get('_passwd'),data.get('gender'),data.get('Status'))
        email=data.get('_email')
        mycursor.execute(mysqlFormula,dataInser)
        myDb.commit()
        # Creating accounts related to client with By id
        mysqlFormula=('SELECT Client_ID FROM client WHERE Email=%s')
        mycursor.execute(mysqlFormula,(email,))
        ids=mycursor.fetchall()[0][0]
        mysqlFormula="INSERT INTO comptes(Account_Type,Subscription_Date,Client_Id) VALUES('Debit',%s,%s)"
        mycursor.execute(mysqlFormula,(today,ids))
        myDb.commit()
        
        return jsonify(data)
    # if request.method=='GET':
    #     mycursor.execute('SELECT * FROM client WHERE Client_Id=%s',())




@app.route('/pagelogin.html')
def pagelogin():
    return render_template('pagelogin.html')  

@app.route('/update',methods=['POST','GET'])
def update():
    mysqlFormula="INSERT INTO transactions(Transaction_Type,Amount, Transaction_Date,Account_Number) VALUES(%s,%s,%s,%s)"
    if request.method=='POST':
        data=request.get_json()
        res=json.loads(data)
        if res[2]=='Loan':
            mycursor.execute("SELECT Account_Number FROM comptes WHERE Client_Id=%s",   (res[1],))
            accountnumber=mycursor.fetchall()[0][0]
            mycursor.execute(mysqlFormula,(res[0][0],res[0][1],res[0][2],accountnumber))
            myDb.commit()
        elif res[2]=='Transfer':
            mycursor.execute("SELECT Account_Number FROM comptes WHERE Client_Id=%s",   (res[1],))
            accountnumber=mycursor.fetchall()[0][0]
            mycursor.execute(mysqlFormula,(res[0][0],res[0][1],res[0][2],accountnumber))
            myDb.commit()
            mycursor.execute(mysqlFormula,(res[0][0],abs(res[0][1]),res[0][2],res[3]))
            myDb.commit()
    if request.method=='GET':
        arg1=request.args.get('accountNumber')
        args2=request.args.get('userId')
        arg3=request.args.get('password')
        mycursor.execute('SELECT Account_Number,client.Passwd FROM comptes INNER JOIN client ON comptes.Client_Id=client.Client_Id WHERE client.Client_ID=%s',(args2,))
        acc=mycursor.fetchone()
        try :
            if acc[0]==int(arg1) and acc[1]==arg3:
                mycursor.execute("UPDATE client SET status='inactive' WHERE Client_Id=%s",(args2,))
                myDb.commit()
                return jsonify(True)
        except:
            return jsonify(False)
        
    return jsonify(res)
    

@app.route('/loginReq',methods=["POST"])
def loginReq():
        #Verifying Login
        elem1=request.get_json().get("Email")
        elem2=request.get_json().get("Passwd")
        mysqlVeiryf='SELECT * FROM client WHERE Email=%s AND Passwd=%s'
        data=(elem1,elem2)
        mycursor.execute(mysqlVeiryf,data)
        alldata=mycursor.fetchall()
        jsonResponse= {
            "error": False,
            "code": 200,
            "data": [],
            "message": "",
        }
        if len(alldata)==0: 
            jsonResponse['error']=True
            jsonResponse['code']=401
            jsonResponse['message']='Invalid Credentials'
        elif len(alldata)>0 and alldata[0][-1]=='active':
            mysqlFormula="""SELECT Transaction_Type,Amount,Transaction_Date FROM transactions INNER JOIN comptes ON transactions.Account_Number=comptes.Account_Number
            INNER JOIN client ON comptes.Client_Id=client.Client_ID WHERE client.Client_ID=%s"""
            mycursor.execute(mysqlFormula,(alldata[0][0],))
            accountssfetch=mycursor.fetchall()
            alldata.append(accountssfetch)
            mycursor.execute('SELECT Account_Number FROM comptes')
            accounts=mycursor.fetchall()
            alldata.append(accounts)
            mycursor.execute('SELECT Account_Number FROM comptes WHERE Client_Id=%s',(alldata[0][0],))
            alldata.append(mycursor.fetchall())
            return jsonify(alldata)
        else:
            jsonResponse['error']=True
            jsonResponse['code']=403
            jsonResponse['message']='Account Disabled'
            
        return jsonify(abort(jsonResponse["code"] ,description=jsonResponse['message']))
    

@app.route('/loginReq',methods=["GET"])
def getLoginReq():
    return jsonify('Hi')
  

@app.route("/transactions",methods=["GET","POST"])
def transactions():
    if request.method=="POST":
        userId=request.get_json().get("UserId")
        mysqlFormula="""SELECT Transaction_Type,Amount,Transaction_Date FROM transactions INNER JOIN comptes ON transactions.Account_Number=comptes.Account_Number
            INNER JOIN client ON comptes.Client_Id=client.Client_ID WHERE client.Client_ID=%s"""
        mycursor.execute(mysqlFormula,(userId,))
        transactions=mycursor.fetchall()
        return jsonify(transactions)


@app.route("/delete",methods=["POST"])
def deleteAccount():
        result=request.get_json()
        arg1=request.get_json().get("accountNumber")
        args2=request.get_json().get('userId')
        arg3=request.get_json().get('passwword')
        print(arg1,args2,arg3)
        mycursor.execute('SELECT Account_Number,client.Passwd FROM comptes INNER JOIN client ON comptes.Client_Id=client.Client_Id WHERE client.Client_ID=%s',(args2,))
        acc=mycursor.fetchone()
        try :
            if acc[0]==int(arg1) and acc[1]==arg3:
                mycursor.execute("UPDATE client SET status='inactive' WHERE Client_Id=%s",(args2,))
                myDb.commit()
                return jsonify(True)
        except:
            return jsonify(False)

if __name__=='__main__':
    app.run(debug=True)

