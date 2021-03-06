from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.http import HttpResponse
from api.serializers import *
import json

@csrf_exempt
def register_user(request):
    """
    Handles the creation of a new user for authentication
    
    Note: This code was provided by Steve Brownlee.
    """

    # Load the JSON string of the request body into a dict
    req_body = json.loads(request.body.decode())

    """
    Create a new user by invoking the `create_user` helper method
    on Django's built-in User model
    """
    new_user = User.objects.create_user(
                    username=req_body['username'],
                    password=req_body['password'],
                    email=req_body['email'],
                    first_name=req_body['first_name'],
                    last_name=req_body['last_name'],
                    )
    new_user.save()

    # Use the REST Framework's token generator on the new user account
    token = Token.objects.create(user=new_user)

    # Return the token to the client
    data = json.dumps({'token':token.key})
    return HttpResponse(data, content_type='application/json')
