import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
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

export default function JogosEditarScreen() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [selecionado, setSelecionado] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [desenvolvedora, setDesenvolvedora] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function buscarJogos() {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get("/api/jogos", {
        params: { limit: 50 },
      });
      setJogos(resposta.data.data);
    } catch (e) {
      setErro("Não foi possível carregar os jogos. Tente novamente mais tarde.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarJogos();
  }, []);

  function selecionarJogo(jogo) {
    setSelecionado(jogo);
    setTitulo(jogo.title ?? "");
    setImagemUrl(jogo.imageUrl ?? "");
    setGenero(jogo.genero ?? "");
    setPlataforma(jogo.plataforma ?? "");
    setAnoLancamento(jogo.ano_lancamento ? String(jogo.ano_lancamento) : "");
    setDesenvolvedora(jogo.desenvolvedora ?? "");
  }

  async function salvarEdicao() {
    if (!selecionado) return;

    if (titulo.length < 3 || titulo.length > 120) {
      Alert.alert("O título é obrigatório e deve ter entre 3 e 120 caracteres.");
      return;
    }

    if (!genero) {
      Alert.alert("O gênero é obrigatório e não pode ficar em branco.");
      return;
    }

    if (!plataforma) {
      Alert.alert("A plataforma é obrigatória e não pode ficar em branco.");
      return;
    }

    if (!anoLancamento || isNaN(Number(anoLancamento))) {
      Alert.alert("O ano de lançamento é obrigatório e deve ser um número válido.");
      return;
    }

    if (!desenvolvedora) {
      Alert.alert("A desenvolvedora é obrigatória e não pode ficar em branco.");
      return;
    }

    setSalvando(true);
    try {
      const resposta = await api.put(`/api/jogos/${selecionado.id}`, {
        title: titulo,
        imageUrl: imagemUrl ? imagemUrl : null,
        genero: genero,
        plataforma: plataforma,
        ano_lancamento: Number(anoLancamento),
        desenvolvedora: desenvolvedora,
      });

      Alert.alert("Jogo atualizado com sucesso.", resposta.data.data.title);

      setSelecionado(null);
      buscarJogos();
    } catch (e) {
      Alert.alert(
        "Ocorreu um erro ao atualizar o jogo",
        "A API respondeu com erro. Confira se todos os campos estão corretos e tente novamente."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Editar jogo</Text>
          <Text style={styles.subtitulo}>PUT /api/jogos/:id</Text>
        </View>

        {!selecionado && (
          <>
            <Text style={styles.instrucao}>Toque em um jogo para editar:</Text>

            {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}
            {erro && <Text style={styles.erro}>{erro}</Text>}

            {!carregando &&
              jogos.map((item) => (
                <Pressable key={item.id} style={styles.card} onPress={() => selecionarJogo(item)}>
                  <Image source={{ uri: item.imageUrl }} style={styles.imagem} resizeMode="cover" />
                  <View style={styles.info}>
                    <Text style={styles.titulo}>{item.title}</Text>
                    <Text style={styles.editar}>editar ›</Text>
                  </View>
                </Pressable>
              ))}
          </>
        )}

        {selecionado && (
          <>
            <Pressable onPress={() => setSelecionado(null)} style={styles.voltar}>
              <Text style={styles.voltarTexto}>‹ voltar para a lista</Text>
            </Pressable>

            <Text style={styles.rotulo}>Título</Text>
            <TextInput
              style={styles.campo}
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Ex: Batman"
            />

            <Text style={styles.rotulo}>URL da imagem (opcional)</Text>
            {imagemUrl ? (
              <Image source={{ uri: imagemUrl }} style={styles.imagemPreview} resizeMode="cover" />
            ) : null}
            <TextInput
              style={styles.campo}
              value={imagemUrl}
              onChangeText={setImagemUrl}
              placeholder="Ex: https://exemplo.com/batman.jpg"
            />

            <Text style={styles.rotulo}>Gênero</Text>
            <TextInput
              style={styles.campo}
              value={genero}
              onChangeText={setGenero}
              placeholder="Ex: Ação"
            />

            <Text style={styles.rotulo}>Plataforma</Text>
            <TextInput
              style={styles.campo}
              value={plataforma}
              onChangeText={setPlataforma}
              placeholder="Ex: PlayStation 5"
            />

            <Text style={styles.rotulo}>Ano de Lançamento</Text>
            <TextInput
              style={styles.campo}
              value={String(anoLancamento)}
              onChangeText={setAnoLancamento}
              placeholder="Ex: 2015"
              keyboardType="numeric"
            />

            <Text style={styles.rotulo}>Desenvolvedora</Text>
            <TextInput
              style={styles.campo}
              value={desenvolvedora}
              onChangeText={setDesenvolvedora}
              placeholder="Ex: Rocksteady Studios"
            />

            <Pressable style={styles.botao} onPress={salvarEdicao} disabled={salvando}>
              <Text style={styles.botaoTexto}>{salvando ? "Salvando..." : "Salvar alterações"}</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fbff" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#102542" },
  subtitulo: { fontSize: 14, color: "#5f6b7a", marginTop: 2 },

  instrucao: { fontSize: 14, color: "#334155", marginBottom: 8 },
  erro: { color: "#c62828", marginTop: 12 },

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
  imagem: {
    width: 88,
    height: 88,
    backgroundColor: "#dbe5f0",
  },
  info: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 12,
    paddingRight: 14,
  },
  titulo: { fontSize: 16, fontWeight: "800", color: "#183247" },
  editar: { fontSize: 13, color: "#1565c0", fontWeight: "600", marginTop: 5 },

  voltar: { marginBottom: 16 },
  voltarTexto: { color: "#1565c0", fontWeight: "700" },

  rotulo: { fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 4 },
  imagemPreview: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    backgroundColor: "#dbe5f0",
    marginBottom: 10,
  },
  campo: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "white",
  },
  botao: {
    backgroundColor: "#1565c0",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  botaoTexto: { color: "white", fontWeight: "700" },
});