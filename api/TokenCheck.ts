import FetcherAuth from "./FetcherAuth";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { authSelector } from "@/redux/auth/authSelector";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/redux/auth/authSlice";

export default function TokenCheck() {
    const dispatch = useDispatch();
    const authState = useSelector(authSelector);
    const cookies = new Cookies();
    const router = useRouter();
    
    FetcherAuth.get('/users/' + cookies.get('studentid'))
    .then((response) => {
        dispatch(authActions.updateAuthState({
            signedIn: true,
        }));
        //console.log(response);
    }).catch((error) => {
        dispatch(authActions.updateAuthState({
            signedIn: false,
            name: '',
            username: '',
        }));
        router.push('/signin');
    });
}