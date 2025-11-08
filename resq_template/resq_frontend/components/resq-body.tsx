import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";

interface User {
  _id: string; // Changed from id to _id to match MongoDB
  name: string;
  email: string;
}

const API_URL = "http://localhost:5000/api/users";

const ResqBody: React.FC = () => {
  const [users, setUsers] = useState<User[]>(
    // Initial state can be empty, or you can keep the sample users for development
    []
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async () => {
    if (name && email) {
      try {
        const response = await axios.post(API_URL, { name, email });
        setUsers([...users, response.data]);
        setName("");
        setEmail("");
        setModalVisible(false);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  const handleUpdateUser = async () => {
    if (selectedUser && name && email) {
      try {
        const response = await axios.put(`${API_URL}/${selectedUser._id}`, {
          name,
          email,
        });
        const updatedUsers = users.map((user) =>
          user._id === selectedUser._id ? response.data : user
        );
        setUsers(updatedUsers);
        setName("");
        setEmail("");
        setSelectedUser(null);
        setModalVisible(false);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const openModal = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      setName(user.name);
      setEmail(user.email);
    } else {
      setSelectedUser(null);
      setName("");
      setEmail("");
    }
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>{item.email}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => openModal(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDeleteUser(item._id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.body}>
      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={() => openModal()}
      >
        <Text style={styles.buttonText}>Add New User</Text>
      </TouchableOpacity>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(user) => user._id}
        style={styles.list}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedUser ? "Edit User" : "Add New User"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={selectedUser ? handleUpdateUser : handleAddUser}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  list: {
    marginTop: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderRadius: 8,
    marginBottom: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemActions: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007bff",
    alignSelf: "flex-start",
  },
  editButton: {
    backgroundColor: "#ffc107",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#28a745",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
});

export default ResqBody;
