import { StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function TemplateRangdong(text: string) {
    return (
        <ThemedView style={styles.titleContainer}>
            <Image
                source={require('@/assets/images/logo_vietnam.png')}
                style={styles.flag_viet}
            />
            <ThemedView style={styles.textContainer}>
                <ThemedText type="title" style={styles.centeredText}>RangdongIoT</ThemedText>
                <ThemedText type="subtitle" style={styles.centeredTextSub}>{text}</ThemedText>
            </ThemedView>
            <Image
                source={require('@/assets/images/rang-dong-icon.png')}
                style={styles.rang}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        backgroundColor: 'white',
    },
    centeredText: {
        textAlign: 'center',
        color: '#C15F05',
        fontSize: 25,
    },
    centeredTextSub: {
        textAlign: 'center',
        color: '#933434',
        fontSize: 15,
        fontStyle: 'italic',
    },
    flag_viet: {
        width: 58,
        height: 65,
        resizeMode: 'contain',
    },
    rang: {
        width: 58,
        height: 55,
        resizeMode: 'contain',
    },
});
