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
        marginTop: '30%',
    },
    loginText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 25,
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