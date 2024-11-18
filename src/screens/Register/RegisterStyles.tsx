import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#D64619',
        alignItems: 'center',
    },
    iconoContainerUser: {
        margin: 'auto',
        height: 40,
        marginTop: 20,
        marginBottom: 40,
        zIndex: 3,
    },
    IconoUser: {
        width: 190,
        height: 190,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#ffcfa9',
    },
    changePhotoButton: {
        backgroundColor: '#ffac72',
        padding: 10,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        bottom: -150,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainerUser: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 130,
        padding: 20,
        paddingTop: 30,
        alignItems: 'center',
        width: '100%',
    },
    RegisterText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 0,
        marginBottom: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 10,
        marginTop: 35,
    },    
    halfInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#aaa',
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