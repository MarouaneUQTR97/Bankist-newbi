from django.db import connection

mycursor=connection.cursor()

class Client:
    def __init__(self,firstName=None,lastName=None,email=None,password=None,dateOfBirth=None,gender=None,status=None,clientId=None):
        self.firstName=firstName
        self.lastName=lastName
        self.email=email
        self.password=password
        self.dateOfBirth=dateOfBirth
        self.gender=gender
        self.status=status
        self.clientId=clientId

    def register(self):
        mysqlFormula=("INSERT INTO client(First_Name,Last_Name,Date_Of_Birth,Email,Passwd,Gender,Status) VALUES(%s,%s,%s,%s,%s,%s,%s)")
        dataToInsert=(self.firstName,self.lastName,
                                   self.dateOfBirth,
                                   self.email,self.password,self.gender,
                                   'active')
        mycursor.execute(mysqlFormula,dataToInsert)

    def loadDataByEmail(self,emaill):
        print(emaill)
        mycursor.execute('SELECT * FROM client WHERE Email=%s',(emaill,))
        data=mycursor.fetchone()
        self.clientId=data[0]
        self.firstName=data[1]
        self.lastName=data[2]
        self.dateOfBirth=data[3]
        self.email=data[4]
        self.password=data[5]
        self.gender=data[6]
        self.status=data[7]
        
    
    