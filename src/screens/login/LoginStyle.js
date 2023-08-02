import { StyleSheet } from 'react-native';

export const loginStyle = props => StyleSheet.create({
    SafeAreaFlex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: props.top,
        paddingBottom: props.bottom,
        paddingLeft: props.left,
        paddingRight: props.right
    },

    TextInput: {
        width: '95%',
        margin: 10
    },

    SignInButton: {
        margin: 40,
        width: '75%'
    }
});
