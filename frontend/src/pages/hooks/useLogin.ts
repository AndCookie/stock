import axios from 'axios';

const baseURL = import.meta.env.VITE_LOCAL_BASEURL;

export const useLogin = async () => {
    try {
        const response = await axios.post(`${baseURL}accounts/login/`, {
            // 원래는 최소한 .env 파일에 넣는 정성이라도 보여줘야 하는데
            // 나중에 코드 반출할 때는 이 부분 참고할 것
            username: 'admin',
            password: 'rkskekfk'
        })
        const result = response.data
    } catch (error) {
        console.log(error)
    }
}