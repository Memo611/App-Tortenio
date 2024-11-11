import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#D64619',
        alignItems: 'center',
    },
    logoContainerRegister: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: -150,
    },
    LogoRegister: {
        width: 200,
        height: 200,
        borderRadius: 150,
    },
    iconoContainerUser: {
        height: 4,
        marginTop: 100,
        zIndex: 3,
    },
    IconoUser: {
        width: 150,
        height: 150,
        borderRadius: 150,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    changePhotoButton: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 20,
        position: 'absolute',
        bottom: -150,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    formContainerUser: {
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
    RegisterText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 65,
        marginBottom: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 10,
    },    
    halfInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 15,
        width: '48%',
        height: 70,
    },
    cancelButton: {
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        width: '48%',
        borderWidth: 1,
        borderColor: '#D64619',
    },
    cancelButtonText: {
        color: '#D64619',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerButton: {
        backgroundColor: '#D64619',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        width: '48%',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },


});

export default styles;