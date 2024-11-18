import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    iconoContainerUserHome: {
        height: 40,
        width: 40,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },
    IconoUserHome: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'white',
    },
    ContainerHeader: {
        backgroundColor: '#fd5b12',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        height: 70,
    },
    Buscar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1.5,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        marginHorizontal: 10,
        height: 40,
    },
    BuscarText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    cartContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    cartIcon: {
        width: 24,
        height: 24,
    },
    cartBadge: {
        position: 'absolute',
        right: -6,
        top: -6,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    promotionsContainer: {
        padding: 10,
        backgroundColor: '#FFF',
    },
    promotionsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    promoItem: {
        alignItems: 'center',
        backgroundColor: '#fe7226',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 5,
    },
    promoImage: {
        width: 120,
        height: 120,
        marginBottom: 10,
        borderRadius: 10,
    },
    promoText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    suggestionsContainer: {
        padding: 10,
    },
    suggestionsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    suggestionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    suggestionItem: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 2,
        backgroundColor: '#fff',
    },
    suggestionImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
});

export default styles;
