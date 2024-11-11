import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    //Global
    container: {
        flex: 1,
        backgroundColor: '#D64619',
    },
    //Global
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#D64619',
        alignItems: 'center',
    },
    //Global
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
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 10,
    },   
    //Global
    icon: {
        marginRight: 10,
    },
    //Global
    input: {
        flex: 1,
        fontSize: 16,
    },
    //Global
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default styles;
