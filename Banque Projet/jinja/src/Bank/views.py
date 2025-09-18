
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render,redirect
import datetime
from django.db import connection
import json
from django.contrib import messages
from Bank.Client import Client
from Bank.models import loginForm,registerForm, transactionsForm

mycursor=connection.cursor()



@csrf_exempt
def home_page_view(request):
    transactionTransfer=transactionsForm()
    if request.method=="POST":
        print('hi')

    return render(request, "name.html", {"transactionTransfer":transactionTransfer})

@csrf_exempt
def testPage(request):
   return render(request,'manage.html')

@csrf_exempt
def login_form(request):
    form1=loginForm()
    form2=registerForm()
    transactionTransfer=transactionsForm()
    if request.method == "POST":
        form = loginForm(request.POST)
        formregister=registerForm(request.POST)
        

        if formregister.is_valid():
            data=request.POST
            dateOfBirth=datetime.datetime(int(data.get('selectYearField')),int(data.get('selectMonthsField')),int(data.get('selectDaysField')))
            newClient=Client(data.get('firstName'),data.get('lastName'),data.get('email'),data.get('password'),dateOfBirth,data.get('genderField'),'active')
            newClient.register()
            return render(request, "index.html", {"form1":form1,"form2":form2})



        if form.is_valid():
            logeedClient=Client()
            logeedClient.loadDataByEmail(request.POST.get('Email'))
            if logeedClient.email==request.POST.get('Email') and logeedClient.password==request.POST.get('Password'):
                request.session['userId']=logeedClient.clientId
                return redirect('/manage')
        else:

           return render(request,"index.html",{"error":"Invalid email or      password","form":form})
                
    # if a GET (or any other method) we'll create a blank form
    else :
        if request.session.get('email'):
            return redirect('/manage')
        form1=loginForm()
        form2=registerForm()

    return render(request, "index.html", {"form1":form1,"form2":form2})


# def second_view(request):
#     if request.method == "POST":
#         formregister=registerForm(request.POST)
        

#         if formregister.is_valid():
#             print('true')



                
#     # if a GET (or any other method) we'll create a blank form
#     else :
#         formregister=registerForm
    
#     return render(request, "index.html", {"formregister" :formregister}) 

def transactions(request):
    transactionTransfer=transactionsForm()
    accountNumber=request.session.get('userId')
    print(accountNumber)
    mycursor.execute("""SELECT transactions.Account_Number,Transaction_Type,Amount,Transaction_Date,client.CLIENT_ID,First_Name FROM transactions INNER JOIN comptes ON transactions.Account_Number=comptes.Account_Number
            INNER JOIN client ON comptes.Client_Id=client.Client_ID WHERE client.Client_ID=%s""",(accountNumber,))
    dat=mycursor.fetchall()
    print(dat)
    userName=dat[0][-1]
    transactions=[]
    for item in dat:
        transactions.append({
            "date": item[3],
            "type":item[1],
            "amount":item[2]})

    return render(request,'manage.html',{
        "accountNumber":accountNumber,
                                               "userName":userName,
                                               "transactions":transactions,
                                               "success":"Welcome "+userName,"transactionTransfer":transactionTransfer
    })