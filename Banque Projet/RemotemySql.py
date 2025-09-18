import mysql.connector

myDb=mysql.connector.connect(
    host='sql9.freemysqlhosting.net',
    user='sql9612827',
    password='VdWgPUa6xU',
    database='sql9612827'
)

mycursor=myDb.cursor()

mycursor.execute(
  "SELECT * FROM client")

data=mycursor.fetchall()
print(data)