import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const lessons = [
  "Criar componentes reutilizáveis",
  "Consumir APIs com fetch",
  "Organizar navegação por arquivos",
  "Trabalhar com estado e formulários",
];

export default function LessonsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Seu caminho</Text>
          <Text style={styles.title}>Trilha de aprendizado</Text>
        </View>

        <Text style={styles.description}>
          Esta aba é destinada a ser um ponto de partida para exercícios e
          atividades práticas. Aqui temos o que será aprendido e utilizado nos apps.
        </Text>

        <View style={styles.list}>
          {lessons.map((lesson, index) => (
            <View key={lesson} style={styles.listItem}>
              <View style={styles.badgeWrap}>
                <Text style={styles.badge}>{index + 1}</Text>
              </View>
              <Text style={styles.listText}>{lesson}</Text>
            </View>
          ))}
        </View>
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
  },
  heroCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#f2d9bb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 16,
  },
  eyebrow: {
    alignSelf: "flex-start",
    backgroundColor: "#fff0df",
    color: "#d96c00",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#2d1f12",
    letterSpacing: -0.6,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#5c4735",
    marginBottom: 18,
  },
  list: {
    gap: 14,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f1e0cf",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  badgeWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#fff1e3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  badge: {
    fontSize: 14,
    fontWeight: "800",
    color: "#d96c00",
  },
  listText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#2d1f12",
    lineHeight: 22,
  },
});
