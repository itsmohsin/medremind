import { Ionicons } from "@expo/vector-icons";
import {useState, useEffect, useRef, useCallback} from "react";
import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";  
export default function HomeScreen(){
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <LinearGradient colors={["#1a8e20", "#146922"]}>
                <View>
                    <View>
                        <View>
                            <Text>Daily Progress</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={24} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </ScrollView>
    )
}