from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@csrf_exempt
def AuthenticateUser(request):
    print('Hello Naz u hit it')
    print(request)
    if request.method == 'POST':
        # Authentication logic here
        return JsonResponse({'message': 'Authentication successful'})
    return JsonResponse({'message': 'Hello KING'})