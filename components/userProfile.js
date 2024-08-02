import React from "react";
import { StyleSheet, View, Text, Image} from "react-native";
import { COLORS } from "../globles";



const UserProfile = ({userData, mockData}) => {
    const user = userData;
    const mockdata = mockData;
    const avatar = '../assets/images/profiles/male_1.jpeg';
    
    return (
        <View style={styles.profileHolder}>
            <View style={styles.profile}>
                <View style={styles.pictureHolder}>
                    <Image style={styles.profilePic} source={require(avatar)} />
                </View>
                <Text style={styles.userName}>{user.user_name}</Text>
                <Text style={styles.userId}>ID: {user.id}</Text>
            </View>
            <View style={styles.digit}>
                <View style={styles.digitItem}>
                    <Text style={styles.number}>{mockdata.following}</Text>
                    <Text style={styles.numberTxt}>Following</Text>
                </View>
                <View style={styles.digitItem}>
                    <Text style={styles.number}>{mockdata.like}</Text>
                    <Text style={styles.numberTxt}>Like</Text>
                </View>
                <View style={styles.digitItem}>
                    <Text style={styles.number}>{mockdata.follower}</Text>
                    <Text style={styles.numberTxt}>Follower</Text>
                </View>
            </View>
        </View>
    );
}

export default UserProfile;

const styles = StyleSheet.create({
    profileHolder: {
        flex: 5,
        backgroundColor: '#00000088',
        flexDirection: 'row',
    },
    profile: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pictureHolder: {
        marginTop: 4,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 160/2,
        borderColor: COLORS.white,
    },
    profilePic: {
        width: 120,
        height: 160,
        borderRadius: 160/2,
    },
    userName: {
        marginTop: 10,
        fontSize: 24,
        color: COLORS.white,
    },
    userId: {
        marginVertical: 2,
        fontSize: 18,
        color: COLORS.white,
    },
    digit: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        borderLeftWidth: 2,
        borderLeftColor: '#ffffff88'
    },
    digitItem: {
        marginVertical: 20,
    },
    number: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    numberTxt: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        color: COLORS.white,
    },
});