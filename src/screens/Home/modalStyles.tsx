import { StyleSheet } from "react-native";

const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalCost: {
        fontSize: 16,
        marginBottom: 5,
    },
    modalTime: {
        fontSize: 16,
        marginBottom: 5,
    },
    modalDescription: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#fd5b12',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    addButton:{
        backgroundColor: '#fd5b12',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    addButtonText:{
        color: 'white',
        fontSize: 16,
    },
});
export default modalStyles;