import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    iconoContainerUserHome: {
        height: 10,
        marginTop: 20,
        marginLeft: 20,
        zIndex: 3,
    },
    ContainerHeader: {
        backgroundColor: '#D64619',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        width: '100%',
        height: 80,
    },
    ContainerMenu: {
        backgroundColor: '#D64619',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: '172%',
        width: '100%',
        height: 80,
    },
    IconoUserHome: {
        marginTop: 1,
        width: 50,
        height: 50,
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
        paddingHorizontal: 5,
        marginLeft: 85,
        marginTop: -5,
        width: '60%',
        height: 40,
    },
    BuscarText: {
        flex: 1,
        fontSize: 16,
    },

});

export default styles;