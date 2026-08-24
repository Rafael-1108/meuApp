import { View, Text, StyleSheet, Image } from "react-native"

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.textoSobre}>Sobre mim</Text>
            <View style={styles.card}>
                <Image
                    style={styles.foto}
                    source={require("../../assets/foto-sobre.jpg")}>
                </Image>
                <Text style={styles.textoNome}>Rafael Santos</Text>
                <Text style={styles.textoHabilidade}>Desenvolvedor Full Stack Jr.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    foto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: "center",
    },
    textoSobre: {
        fontSize: 30,
        fontFamily: "Poppins_700Bold",
        fontWeight: "bold",
        textAlign: "center",
    },
    textoNome: {
        textAlign: "center",
        fontFamily: "Poppins_700Bold",
        fontSize: 22,
        fontWeight: "bold",
    },
    card: {
        gap: 10,
        backgroundColor: "#d6d6d6",
        height: 300,
        width: 280,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        justifyContent: "center",
        display: "flex",
        alignSelf: "center",
    },
    textoHabilidade: {
        textAlign: "center",
        fontSize: 14,
        fontFamily: "Poppins_700Bold",
    }
});