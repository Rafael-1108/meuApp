import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY = "cv_GVuy5GPvAqsQJTi8sE-4c7xQF8UaoR5Jx43RJcJ7ixDa7vvCVYUxj-RWVvbqbgXg";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function JogosExcluirScreen() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [excluindoId, setExcluindoId] = useState(null);

  async function buscarJogos() {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get("/api/jogos", {
        params: { limit: 50 },
      });
      setJogos(resposta.data.data);
    } catch (error) {
      setErro("Não foi possível carregar os jogos. Tente novamente mais tarde.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarJogos();
  }, []);

  async function excluirJogo(id) {
    setExcluindoId(id);
    try {
      await api.delete(`/api/jogos/${id}`);
      setJogos((atual) => atual.filter((item) => item.id !== id));
    } catch (error) {
      Alert.alert(
        "Não deu pra excluir o jogo",
        "A API respondeu com erro. Tente novamente em instantes."
      );
    } finally {
      setExcluindoId(null);
    }
  }

  function confirmarExclusao(jogo) {
    Alert.alert(
      "Excluir jogo",
      `Tem certeza que quer excluir "${jogo.title}"? Essa ação não pode ser desfeita.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => excluirJogo(jogo.id),
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Excluir jogo</Text>
          <Text style={styles.subtitulo}>DELETE /api/jogos/:id</Text>
        </View>

        {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}
        {erro && <Text style={styles.erro}>{erro}</Text>}

        {!carregando &&
          jogos.map((jogo) => (
            <View key={jogo.id} style={styles.card}>
              <Image source={{ uri: jogo.imageUrl }} style={styles.imagem} resizeMode="cover" />
              <View style={styles.info}>
                <Text style={styles.titulo}>{jogo.title}</Text>
                <Text style={styles.categoria}>
                  {jogo.category} · {jogo.year}
                </Text>
              </View>

              <Pressable
                style={[
                  styles.botaoExcluir,
                  excluindoId === jogo.id && styles.botaoExcluirDesabilitado,
                ]}
                onPress={() => confirmarExclusao(jogo)}
                disabled={excluindoId === jogo.id}
              >
                <Text style={styles.botaoExcluirTexto}>
                  {excluindoId === jogo.id ? "..." : "Excluir"}
                </Text>
              </Pressable>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#eef4f8" },
  conteudo: { padding: 22, paddingBottom: 52 },
  header: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#12304a",
    borderBottomWidth: 4,
    borderBottomColor: "#f28f3b",
  },
  tituloPagina: { fontSize: 28, fontWeight: "800", color: "#ffffff" },
  subtitulo: { fontSize: 14, color: "#b9d1df", marginTop: 6 },

  erro: {
    color: "#a52a2a",
    marginTop: 12,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#fee2e2",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#d9e3e9",
    shadowColor: "#12304a",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  imagem: { width: 88, height: 88, backgroundColor: "#dbe5f0" },
  info: { flex: 1, justifyContent: "center", paddingVertical: 12, paddingRight: 14 },
  titulo: { fontSize: 16, fontWeight: "800", color: "#183247" },
  categoria: { fontSize: 13, color: "#647b89", marginTop: 5 },

  botaoExcluir: {
    backgroundColor: "#f28f3b",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 12,
  },
  botaoExcluirDesabilitado: {
    opacity: 0.7,
  },
  botaoExcluirTexto: { color: "#ffffff", fontWeight: "700", fontSize: 13 },
});