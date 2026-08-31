import { View, Text, StyleSheet, Image, Pressable, ScrollView, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const githubUrl = "https://github.com/Rafael-1108";
const linkedinUrl = "https://linkedin.com/in/rafael-santos-5a2aa4349/";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Sobre mim</Text>
          <Text style={styles.subtitle}>
            Conheça um pouco mais da minha trajetória e do meu perfil profissional.
          </Text>

          <View style={styles.profileCard}>
            <Image
              style={styles.foto}
              source={require("../../assets/foto-sobre.jpg")}
            />
            <Text style={styles.name}>Rafael Santos</Text>
            <Text style={styles.role}>Desenvolvedor Full Stack Jr.</Text>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Localização</Text>
              <Text style={styles.infoValue}>Campinas, SP</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Especialidade</Text>
              <Text style={styles.infoValue}>React Native + APIs</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <Pressable
              style={styles.primaryButton}
              onPress={() => Linking.openURL(githubUrl)}
            >
              <Text style={styles.primaryButtonText}>Ver projetos</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={() => Linking.openURL(linkedinUrl)}
            >
              <Text style={styles.secondaryButtonText}>Contato</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffaf3",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2d1f12",
    textAlign: "left",
    letterSpacing: -0.6,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#5b4738",
  },
  profileCard: {
    marginTop: 24,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f4dfc7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#f4dfc7",
  },
  name: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    color: "#2d1f12",
  },
  role: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 15,
    color: "#d96c00",
    fontWeight: "600",
  },
  infoGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#fff1e3",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f3d3a1",
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8a5a26",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#2d1f12",
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#f35900",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#f35900",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#f35900",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#f35900",
    fontSize: 16,
    fontWeight: "800",
  },
});