
from django import forms
import datetime

class loginForm(forms.Form):
    Email=forms.EmailField(widget=forms.EmailInput(attrs={'class':'label logemail'}))
    Password=forms.CharField(widget=forms.PasswordInput(attrs={'class':'label logpassword'}))

currentYear=datetime.datetime.now()

class registerForm(forms.Form):
    Gender_Choices = [
        ('Male', 'Male'),
        ('Femali', 'Female'),
        ('Other', 'Other')
    ]
    OPTIONS=[]
    monthOptions=[]
    months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    years=[]
    firstName=forms.CharField(widget=forms.TextInput(attrs={
         'class':'label fName','placeholder':'First Name'
    }),label='')
    lastName=forms.CharField(widget=forms.TextInput(attrs={
         'class':'label lName','placeholder':'Last Name'}),label='')
    email=forms.EmailField(widget=forms.EmailInput(attrs={'class':'label emailreg','placeholder':'Email'}),label='')
    password=forms.CharField(widget=forms.PasswordInput(attrs={'class':'label passwd','placeholder':'Password'}),label='')
    genderField=forms.ChoiceField(choices=Gender_Choices,widget=forms.RadioSelect(),label='')


    for i in range(1,32):
        OPTIONS.append((i,str(i)))
    
    for i in range(len(months)):
          monthOptions.append((i+1,months[i]))
    
    for i in range(80):
        years.append((str(int(currentYear.year)-i-18),str(int(currentYear.year)-i-18)))
  


    selectDaysField=forms.ChoiceField(choices=tuple(OPTIONS),label='Select a day')
    selectMonthsField=forms.ChoiceField(choices=tuple(monthOptions),label='Select month')
    selectYearField=forms.ChoiceField(choices=tuple(years),label='Select year')


def positive_value(value):
    if value <=0:
        raise forms.ValidationError("Please enter a valid value")

class transactionsForm(forms.Form):
    amountField=forms.IntegerField(validators=[positive_value],widget=(forms.TextInput(attrs={'class':'label num'})),label='')
    accountToField=forms.IntegerField(validators=[positive_value],widget=(forms.TextInput(attrs={'class':'label num'})),label='')


