import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin";
import { login as loginService } from "../services/Service";

interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    isLoading: boolean;
    setUsuario: Dispatch<SetStateAction<UsuarioLogin>>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>(() => {
        const storagedUser = sessionStorage.getItem('@App:usuario'); // Alterado para sessionStorage
        if (storagedUser) {
            return JSON.parse(storagedUser);
        }
        return {
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: "",
            creditoCarbono: 0
        };
    });

    useEffect(() => {
        sessionStorage.setItem('@App:usuario', JSON.stringify(usuario)); // Alterado para sessionStorage
    }, [usuario]);

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true);
        try {
            await loginService(`/usuarios/logar`, userLogin, setUsuario);
            alert("Usuário logado com sucesso");
        } catch (error) {
            console.log(error);
            alert("Dados do usuário inconsistentes");
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: "",
            creditoCarbono: 0
        });
        sessionStorage.removeItem('@App:usuario'); // Alterado para sessionStorage
        sessionStorage.removeItem('carrinho');
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading, setUsuario }}>
            {children}
        </AuthContext.Provider>
    );
}