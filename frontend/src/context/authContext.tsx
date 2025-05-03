import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface User {
	id: string;
	username: string;
	email: string;
	avatarUrl: string; 
}

interface AuthContextType {
	authUser: User | null;
	setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
	loading: boolean;
}

interface AuthProviderProps {
	children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthContextProvider");
	}
	return context;
};


export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authUser, setAuthUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkUserLoggedIn = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/auth/check", { credentials: "include" });
				const data = await res.json();
				setAuthUser(data.user); // null or authenticated user object
			} catch (error) {
				if(error instanceof Error){
                    toast.error(error.message);
                }
			} finally {
				setLoading(false);
			}
		};
		checkUserLoggedIn();
	}, []);

	return <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>{children}</AuthContext.Provider>;
};