import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D64619',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: -40,
    },
    logoContainerRegister: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: -150,
    },
    iconoContainerUser: {
        height: 10,
        marginTop: 80,
        zIndex: 3,      
    },
    IconoUser: {
        width: 150,
        height: 150,
        borderRadius: 150,
    },
    LogoRegister:{
        width: 200,
        height: 200,
        borderRadius: 150,
    },
    logo: {
        width: 250,
        height: 250,
        borderRadius: 150,
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        paddingTop: 40,
        alignItems: 'center',
        width: '100%',
        marginTop: '11%',
    },
    formContainerUser:{
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        margin: 70,
        padding: 20,
        paddingTop: 30,
        alignItems: 'center',
        width: '100%',
    },
    loginText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    RegisterText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 65,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 15,
        marginVertical: 15,
        width: '90%',
        height: 70,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    forgotPassword: {
        color: '#D64619',
        alignSelf: 'flex-end',
        marginVertical: 10,
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#D64619',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        width: '90%',
        marginVertical: 10,
        height: 50,
    },
    CancelButton: {
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        width: '90%',
        marginVertical: 10,
        height: 50,
    },
    CancelButtonText: {
        color: '#D64619',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    registerText: {
        color: '#333',
    },
    registerLink: {
        color: '#D64619',
        fontWeight: 'bold',
    },
});

export default styles;