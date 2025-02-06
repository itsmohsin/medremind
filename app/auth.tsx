import { useState, useEffect } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentcation from 'expo-local-authentication';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const {width} = Dimensions.get('window');



export default function AuthScreen(){
    const [hasBiometrics, setHasBiometrics] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const route = useRoute();

    useEffect(()=>{
        checkBiometrics();
    },[])

    const checkBiometrics = async() => {
        const hasHardware = await LocalAuthentcation.hasHardwareAsync();
        const isEnrolled = await LocalAuthentcation.isEnrolledAsync();
        setHasBiometrics(hasHardware && isEnrolled);
    }

    const authenticate = async() => {
        try {
        setError(null);
        setIsAuthenticating(true);
        const hasHardware = await LocalAuthentcation.hasHardwareAsync();
        const isEnrolled = await LocalAuthentcation.isEnrolledAsync();
        const supportTypes = await LocalAuthentcation.supportedAuthenticationTypesAsync;
        // handle supported authentication types
        const  auth = await LocalAuthentcation.authenticateAsync({
            promptMessage: hasHardware && hasBiometrics ? 'Use face ID/Touch' : 'Enter your PIN to access medication',
            fallbackLabel: 'Use PIN',
            cancelLabel: 'Cancel',
            disableDeviceFallback: false,
        });
        if(auth.success) {
            router.replace('/')
        } else {
            setError('Authentication failed: Please try again')
        }
    } catch (error) {}
    };

    return (
        <LinearGradient colors={['#4caf50', '#2e7d32']} style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name='medical' size={80} color="white"/>
                </View>
                <Text style={styles.title}>MedRemind</Text>
                <Text style={styles.subtitle}>Your Personal Medicaton Reminder</Text>

                <View style={styles.card}>
                    <Text style={styles.welcomeText}>Welcome Back!</Text>
                    <Text style={styles.instructionsText}>{hasBiometrics 
                    ? "Use Face ID/TouchID or PIN access your medicatios" 
                    : "Enter your PIN to access your Medications"}
                    </Text>
                    <TouchableOpacity style={[styles.button, isAuthenticating && styles.buttonDisabled]}
                    onPress={authenticate}
                    disabled={isAuthenticating}> 
                        <Ionicons name={hasBiometrics ? "finger-print-outline" : "keypad-outline"}
                        size={(24)}
                        color='white'
                        style={styles.buttonIcon}
                        />
                        <Text style={styles.buttonText}>
                            {isAuthenticating ? 'Verifying...' : hasBiometrics ? 'Authenticate' : "Enter PIN"}
                        </Text>
                    </TouchableOpacity>
                    {error && <View style={styles.errorContainer}><Ionicons name="alert-circle" size={20} color={'#f44336'}/>
                    <Text style={styles.errorText}>{error}</Text></View>}
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    iconContainer:{
        width:120,
        height:120,
        backgroundColor: 'rgba(255,255,0.2)',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white' ,
        textShadowColor: "RGBA(0,0,0,0.2",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 3,
    },
    subtitle:{
        fontSize: 18,
        color: 'white',
        marginBottom: 40,
        textShadowColor: "RGBA(255,255,255,0.9",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 3,
        textAlign: 'center',
    },
    card:{
        backgroundColor: 'white',
        width: width - 40,
        padding: 30,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    welcomeText:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    instructionsText:{
        fontSize: 16,
        marginBottom: 30,
        color: '#666',
        textAlign: 'center',
    },
    button:{
        backgroundColor: '#4caf50',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonDisabled:{
        opacity: 0.7,
    },
    buttonIcon:{
        marginRight: 10,
    },
    buttonText:{
        color:"white",
        fontSize: 16,
        fontWeight: '600',
    },
    errorContainer:{
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 20,
        padding: 10,
        backgroundColor: "#ffebee",
        borderRadius: 8,
    },
    errorText:{
        color: "#f44336",
        fontSize: 14,
        marginLeft: 8,
   },
});