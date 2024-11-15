import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    iconoContainerUserHome: {
        height: 5,
        marginTop: 10,
        marginLeft: 10,
        zIndex: 3,
    },
    ContainerHeader: {
        backgroundColor: '#fd5b12',
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
    promotionsContainer: {
        padding: 10,
        backgroundColor: '#FFF'
    },
    promotionsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    promoItem: {
        alignItems: 'center',
        backgroundColor: '#fe7226',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20
    },
    promoImage: {
        width: 100,
        height: 100,
        marginBottom: 10
    },
    promoText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    suggestionsContainer: {
        padding: 10
    },
    suggestionsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 30
    },
    suggestionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    suggestionItem: {
        width: 180,
        height: 180,
        borderRadius: 10,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    suggestionImage: {
        width: 150,
        height: 150
    },
});

export default styles;