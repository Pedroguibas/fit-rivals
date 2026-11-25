import Colors from "@/constants/Colors";
import { Modal, ModalProps, Pressable, StyleSheet, View } from "react-native";

export interface ThemedModalProps extends ModalProps {
  dismiss: () => void;
}

const ThemedModal = ({
  children,
  dismiss,
  style,
  ...props
}: ThemedModalProps) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={dismiss}
      style={styles.modal}
      {...props}
    >
      <Pressable onPress={dismiss} style={styles.modalContentContainer}>
        <View style={[styles.modalContent, style]}>{children}</View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#00000020",
  },
  modalContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  modalContent: {
    padding: 16,
    backgroundColor: Colors.backgroundSecondary,
    gap: 8,
    width: "100%",
    alignItems: "center",
  },
});

export default ThemedModal;
