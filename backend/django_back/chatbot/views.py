from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from openai import OpenAI
from .models import Message
from .serializers import MessageSaveSerializer


api_key = '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'

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat(request):
    if request.method == "POST":
        try:
            user = request.user
            user_message = request.data.get("message")
            previous_message = Message.objects.filter(user=user)
            if not user_message:
                return Response({"error": "No message provided."}, status=status.HTTP_400_BAD_REQUEST)

            # OpenAI API 호출
            client = OpenAI(
                api_key=api_key,
            )
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a financial advisor specialized in stock analysis. "
                        "Answer all questions in a formal tone with bullet points if applicable."
                    )
                }
            ]
            for message in previous_message:
                messages.append({"role": message.role, "content": message.content})
                
            messages.append({
                {"role": "user", "content": user_message},
            })
            chat_completion = client.chat.completions.create(
                model="gpt-4o",
                messages=messages
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer = MessageSaveSerializer(data={
            "user": user, 
            "role": "user", 
            "content": user_message
        })
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            
        serializer = MessageSaveSerializer(data={
            "user": user, 
            "role": "assistant", 
            "content": chat_completion.choices[0].message.content
        })
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        print(chat_completion.choices[0])
        return Response(chat_completion.choices[0].message.content, status=status.HTTP_200_OK)
    return Response({"error": "Invalid request method."}, status=400)
