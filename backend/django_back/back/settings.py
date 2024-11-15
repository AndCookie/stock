from pathlib import Path
from dotenv import load_dotenv
import os
import requests
import json

load_dotenv()

# 환경 변수 설정
# REAL_APP_KEY = os.getenv('REAL_APP_KEY')
# REAL_APP_SECRET = os.getenv('REAL_APP_SECRET')
# REAK_ACCOUNT = os.getenv('REAK_ACCOUNT')
REAL_APP_KEY = "PStMa79z25Ka0OWfSdMvZljWXmDFTAng5ufL"
REAL_APP_SECRET = "aqLZVLgaBJOk0WsdW38Vq6p+jiVs404/652k1XgWfkSXn8PuKwuBYiwOQ9rIEN+AdLkF9zvJ3lGGTtSIsqCKYxhmeYQZvdGeVsVz+4XAlC/dTojAZ8OQMTbrCbGZ4Mmqpe5ZNG9t7efuhzAazjJzuiQPPd9NYjNRpZe1vBx/+0z+Bi5na6g="
REAK_ACCOUNT = "64575110"
REAL_API_TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6Ijc0ZWE1NWE4LWEwZGEtNDE5Zi05YjRmLTYyMGU5NDAyZDRjMCIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTczMTczNDgzMiwiaWF0IjoxNzMxNjQ4NDMyLCJqdGkiOiJQU3RNYTc5ejI1S2EwT1dmU2RNdlpsaldYbURGVEFuZzV1ZkwifQ.b0U1HtaHkUbw4sVw5Ad7RnahKj2CoRZVLlQvfBvVEM_McpPc8jtJ6kue02AKCFmSxPPK36qZUpTtiqkWqbXWCQ"
# 24시간에 한번씩 값을 수정해야함

# PAPER_APP_KEY = os.getenv('PAPER_APP_KEY')
# PAPER_APP_SECRET = os.getenv('PAPER_APP_SECRET')
# PAPER_ACCOUNT = os.getenv('PAPER_ACCOUNT')
PAPER_APP_KEY = "PStLk8cMxc3lhYzdOAb5mEmAbl2UNXspHBKD"
PAPER_APP_SECRET = "eS6DFurPiPr4V0txgTokJ0ziZkSXI2c81O3ECnwgfCEIagPFqLIV1vjwUC6blGOwBHdkWkGjWpDmmgnlInQL/v9oysIPG76Rddr0Gh+9F9X6M3ShdfgO1/qjCM8b3RxBzEm+xUdXLvhmXpTPQbge73n1pECCOYpmPpkrOxefCeQrBiH/uw8="
PAPER_ACCOUNT = "50120539"
PAPER_API_TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjBhMTZiNjc5LTEwYWYtNGRiZi04YWExLTE5YmVhMTQyOTg5YSIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTczMTczNDc5MCwiaWF0IjoxNzMxNjQ4MzkwLCJqdGkiOiJQU3RMazhjTXhjM2xoWXpkT0FiNW1FbUFibDJVTlhzcEhCS0QifQ.9vndnI_J-yaNJZPmVU9EnBhbvgURh3qJdkNVKfUoKMGoB3EmAFOjpFO66T3h48SmASsMXgucUHdyhNDGZY041g"


def get_approval(mode):
    if mode == 'real':
        url = 'https://openapi.koreainvestment.com:9443'  # 실전투자계좌
        key = REAL_APP_KEY
        secret = REAL_APP_SECRET
    elif mode == 'paper':
        url = 'https://openapivts.koreainvestment.com:29443'  # 모의투자계좌
        key = PAPER_APP_KEY
        secret = PAPER_APP_SECRET
    else:
        raise ValueError("올바른 모드를 지정해야 합니다: 'real' 또는 'paper'")
        
    headers = {"content-type": "application/json"}
    body = {
        "grant_type": "client_credentials",
        "appkey": key,
        "secretkey": secret
    }
    URL = f"{url}/oauth2/Approval"
    res = requests.post(URL, headers=headers, data=json.dumps(body))
    if res.status_code == 200:
        return res.json().get("approval_key")
    else:
        raise Exception("Approval key 요청 실패: " + res.text, "key:", key, "secret:", secret)

## 싸피 IP 쓰면 이 부분이 안돼
REAL_APPROVAL_KEY = get_approval('real')
PAPER_APPROVAL_KEY = get_approval('paper')

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

AUTH_USER_MODEL = 'accounts.User'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-s!o*2vi_^u0peb6f*_5x%6=^9f!b!jqjo2%8sqoefkk83+*vg%'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES' : [
        'rest_framework.authentication.TokenAuthentication',
    ],
}

REST_USE_JWT = True

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = "optional"
ACCOUNT_AUTHENTICATION_METHOD = 'username'
ACCOUNT_USERNAME_REQUIRED = True

SITE_ID =1

LOGIN_REDIRECT_URL = '/'
# Application definition

INSTALLED_APPS = [
    'accounts',
    'stocks', 
    'channels', 
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'dj_rest_auth',
    'corsheaders',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth.registration',
    'allauth.socialaccount.providers.google',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOW_ALL_ORIGINS = True  # 모든 도메인 허용 (개발 중)

CORS_ALLOWED_ORIGINS =[
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'http://k11a204.p.ssafy.io', 
    'https://k11a204.p.ssafy.io', 
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'content-type',
    'authorization',
    'x-csrftoken',
]

ROOT_URLCONF = 'back.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'back.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'modumotu',
        'USER' : 'root',
        'PASSWORD' : os.getenv("MYSQL_PASSWORD"),
        'HOST' : '127.0.0.1',
        'PORT' : '3306',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ASGI 설정
ASGI_APPLICATION = "back.asgi.application"

# Channels Layer 설정 (기본으로 Redis를 추천하지만, 개발용으로 In-Memory Layer 사용 가능)
# 둘의 차이점을 알아보고 추후 수정해보자
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    },
}

CRONJOBS = [
    ('0 18 * * *', 'stocks.management.commands.move_to_mysql')  # 매일 오후 6시에 실행
]

ENVIRONMENT = os.getenv('ENVIRONMENT')
if ENVIRONMENT == 'local':
    REDIS_HOST = '127.0.0.1'
else:
    REDIS_HOST = 'redis'
REDIS_PORT = 6379
REDIS_DB = 0

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{REDIS_HOST}:{REDIS_PORT}/{REDIS_DB}",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}

# Celery 설정
CELERY_BROKER_URL = f'redis://{REDIS_HOST}:{REDIS_PORT}/0'
CELERY_RESULT_BACKEND = f'redis://{REDIS_HOST}:{REDIS_PORT}/0'
CSRF_TRUSTED_ORIGINS = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://k11a204.p.ssafy.io",
    "https://k11a204.p.ssafy.io",
]