import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, CreditCard, Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const CardItem = ({ card, onDelete }) => (
  <View style={styles.cardContainer}>
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <CreditCard size={24} color="white" />
        <Text style={styles.cardType}>{card.type}</Text>
      </View>
      <Text style={styles.cardNumber}>**** **** **** {card.lastFour}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardName}>{card.name}</Text>
        <Text style={styles.cardExpiry}>{card.expiry}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(card.id)}>
      <Trash2 size={20} color="#DB0011" />
    </TouchableOpacity>
  </View>
);

export default function CardsScreen() {
  const router = useRouter();
  const [cards, setCards] = React.useState([
    {
      id: '1',
      type: 'Visa',
      lastFour: '4242',
      name: 'John Doe',
      expiry: '12/25',
    },
    {
      id: '2',
      type: 'Mastercard',
      lastFour: '8888',
      name: 'John Doe',
      expiry: '09/24',
    },
  ]);

  const handleDeleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const handleAddCard = () => {
    router.push('/profile/add-card');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#172e73" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cards</Text>
      </View>

      <ScrollView style={styles.content}>
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onDelete={handleDeleteCard}
          />
        ))}

        <TouchableOpacity style={styles.addCardButton} onPress={handleAddCard}>
          <Plus size={24} color="#172e73" />
          <Text style={styles.addCardText}>Add New Card</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#172e73',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardType: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  cardNumber: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  cardExpiry: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  deleteButton: {
    padding: 12,
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#172e73',
    borderStyle: 'dashed',
    borderRadius: 12,
    marginTop: 8,
  },
  addCardText: {
    color: '#172e73',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginLeft: 8,
  },
}); 