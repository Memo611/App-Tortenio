import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    iconoContainerUserHome: {
        height: 5,
        marginTop: 10,
        marginLeft: 10,
        zIndex: 3,
    },
    ContainerHeader: {
        backgroundColor: '#D64619',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        width: '100%',
        height: 60,
    },
    IconoUserHome: {
        marginTop: 10,
        marginLeft: 5,
        width: 30,
        height: 30,
        borderRadius: 150,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'white'
    },

    Buscar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1.5,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: 1,
        marginLeft: 85,
        marginTop: 3,
        width: '60%',
        height: 37,
    },
    BuscarText: {
        flex: 1,
        marginTop: 1,
        marginBottom: -4,
        fontSize: 16,
    },

});

export default styles;