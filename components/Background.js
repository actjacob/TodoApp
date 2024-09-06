// import React from "react";
// import { ImageBackground, View, StyleSheet } from "react-native";

// const Background = ({ children }) => {
//   return (
//     <ImageBackground
//       source={require("../image/fairy_bulutumsu_1.jpg")} // Düzeltme: require() kullanarak dosya yolunu belirtin
//       style={styles.background} // Düzeltme: style'da StyleSheet.background yerine styles.background kullanın
//       imageStyle={styles.image} // Fotoğrafı sola hizalamak için eklendi
//     >
//       <View style={styles.content}>{children}</View>
//     </ImageBackground>
//   );
// };

// // Stil tanımlamaları
// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     resizeMode: "cover", // İsteğe bağlı: Resmin nasıl ayarlanacağını belirtir
//   },
//   image: {
//     resizeMode: "cover", // Fotoğrafın tam ekrana yayılmasını sağlar
//     left: 0,
//     rigth: null,
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center", // Çocuk bileşenlerin hizalanması
//   },
// });

// export default Background; // Varsayılan olarak bileşeni dışa aktarın
