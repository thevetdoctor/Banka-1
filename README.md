# Banka

[![Build Status](https://travis-ci.org/techneplus/Banka.svg?branch=develop)](https://travis-ci.org/techneplus/Banka)
[![Coverage Status](https://coveralls.io/repos/github/techneplus/Banka/badge.svg?branch=develop)](https://coveralls.io/github/techneplus/Banka?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/ac1d1fcc006bfd56a83d/maintainability)](https://codeclimate.com/github/techneplus/Banka/maintainability)

Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money..

## UI hosted on gh pages
https://techneplus.github.io/Banka/UI/index.html

## Server side hosted on Heroku
https://broad-bank.herokuapp.com/

## API Documentation
https://broad-bank.herokuapp.com//api-docs

## Table of Content
 * [Getting Started](#getting-started)

 * [Prerequisites for installation](#Prerequisites)
 
 * [Installation](#installation)

 * [Test](#test)
 
 * [ API End Points Test Using Postman](#api-end-points)

 * [Coding Style](#coding-style)
 
 * [Features](#features)
 
 * [Built With](#built-with)
 
## Getting Started

### Prerequisites for installation
1. Node js
2. Express
3. Git

### Installation
1. Clone this repository into your local machine:
```
e.g git clone https://github.com/techneplus/Fast-Food-Fast
```
2. Install dependencies 
```
e.g npm install.
```
3. Start the application by running the start script.

e.g npm start

4. Install postman to test all endpoints on port 3000.

### Test
run test using 'npm test'.

### API End Points Test Using Postman

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>/api/v1/auth/signup</td>  <td>User signup</td></tr>

<tr><td>POST</td> <td>/api/v1/auth/signin</td>  <td>User signin</td></tr>

<tr><td>POST</td> <td>/api/v1/accounts</td>  <td>User Create a bank account after they sign in</td></tr>

<tr><td>PUT</td> <td>/api/v1/account/:accountNumber</td>  <td>Admin can update an account status</td></tr>

<tr><td>DELETE</td> <td>/api/v1/accounts/:accountNumber</td>  <td>Admin can delete a bank account</td></tr>

<tr><td>POST</td> <td>/api/v1/transactions/:accountNumber/credit</td>  <td>Staff can credit a bank account</td></tr>
<tr><td>POST</td> <td>/api/v1/transactions/:accountNumber/debit</td>  <td>Staff can debit a bank account</td></tr>
<tr><td>GET</td> <td>/api/v1/accounts/:accountNumber/transactions</td>  <td>Gets a specific bank account transaction history</td></tr>

<tr><td>GET</td> <td>/api/v1/transactions/:id</td>  <td>Gets a specific transaction</td></tr>

<tr><td>GET</td> <td>/api/v1/user/:email/accounts</td>  <td>Gets bank accounts of a specific user</td></tr>

<tr><td>GET</td> <td>/api/v1/accounts/:accountNumber</td>  <td>Gets a specific bank account</td></tr>

<tr><td>GET</td> <td>/api/v1/accounts</td>  <td>Gets all bank accounts</td></tr>

<tr><td>GET</td> <td>/api/v1/accounts?status=active</td>  <td>Gets all active bank accounts</td></tr>

<tr><td>GET</td> <td>/api/v1/accounts?status=dormant</td>  <td>Gets all dormant bank accounts</td></tr>
 
</table>

### Coding Style
* Airbnb style guide. 

## Features

 ### Admin - 
 * Admins can see all transactions
 * Admins can see all bank account
 * Admins can delete a bank account
 * Admins can change bank account status
 * Admins can debit a bank account
 * Admins can credit a bank account


 ### Users
 * A user can create an account
 * A user can signin to his/her account
 * A user can create a bank account either savings or current
 * A user can view account transaction history
 

## Built With
* NodeJs-EXPRESS: Node.js is a javascript runtime built on Chrome's V8 javascript engine.

* html5: It is used for structuring the frontend.

* css: It is used for styling the frontend.

* Vanilla Javascript: It is used for scripting the client side.