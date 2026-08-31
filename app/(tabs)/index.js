import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const codeverseLogo = require("../../assets/codeverse-logo.png");

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.logoWrap}>
            <Image
              source={codeverseLogo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.eyebrow}>React Native + Expo Router</Text>
          <Text style={styles.title}>Seu app já nasce organizado</Text>
          <Text style={styles.description}>
            Estrutura pronta para o aluno focar em componentes, navegação e
            lógica de negócio desde a primeira aula.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>O que vem configurado</Text>
          <View style={styles.list}>
            <Text style={styles.cardItem}>• JavaScript habilitado</Text>
            <Text style={styles.cardItem}>• Rotas com expo-router</Text>
            <Text style={styles.cardItem}>• Abas e modal de exemplo</Text>
            <Text style={styles.cardItem}>• Scripts para Android, iOS e Web</Text>
          </View>
        </View>

        <Link href="/modal" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Abrir modal de exemplo</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffaf3",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 18,
  },
  hero: {
    alignItems: "center",
    gap: 10,
    padding: 26,
    borderRadius: 28,
    backgroundColor: "#f35900",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  logoWrap: {
    width: 128,
    height: 128,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  logo: {
    width: 100,
    height: 100,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#ffe4ce",
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: -0.6,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#fff2e9",
    textAlign: "center",
  },
  card: {
    gap: 12,
    padding: 20,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#f4ddc4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2d1f12",
  },
  list: {
    gap: 8,
  },
  cardItem: {
    fontSize: 15,
    color: "#4e3a2b",
    lineHeight: 22,
  },
  button: {
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#d96c00",
    shadowColor: "#d96c00",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
  },
});
