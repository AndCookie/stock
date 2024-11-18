from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from openai import OpenAI


api_key = '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'

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat(request):
    if request.method == "POST":
        try:
            user_message = request.data.get("message")

            if not user_message:
                return Response({"error": "No message provided."}, status=status.HTTP_400_BAD_REQUEST)

            # OpenAI API 호출
            client = OpenAI(
                api_key=api_key,
            )

            chat_completion = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "user",
                        "content": "Say this is a test",
                    }
                ],
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(chat_completion, status=status.HTTP_200_OK)
    return Response({"error": "Invalid request method."}, status=400)
