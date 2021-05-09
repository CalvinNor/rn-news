import React from 'react';
import { Component } from 'react';
import { Alert, Text, View, Image, StyleSheet, Linking, Button } from 'react-native';
import { Article } from '../../data/article';

type State = {
}

type Props = {
    route?: any, // injected by RN
}

export type RouteData = {
    article: Article,
}

export class DetailsScreen extends Component<Props, State> {

    render() {
        const { article } = this.props.route.params
        return (
            <View style={styles.detailsContainer}>
                <Image style={styles.articleImage}
                    source={{
                        uri: article.urlToImage,
                    }}
                />
                <Text style={styles.articleContent}>
                    {article.content}
                </Text>
                <Button title="Read more" onPress={() => {
                    this.onReadMore(article)
                }} />
            </View>
        )
    }

    private async onReadMore(article: Article) {
        const articleUrl = article.url
        const supported = await Linking.canOpenURL(articleUrl);

        if (supported) {
            await Linking.openURL(articleUrl);
        } else {
            Alert.alert(`Don't know how to open this URL: ${articleUrl}`);
        }
    }
}

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: "#fafafa",
        height: '100%',
        padding: 16,
    },
    articleImage: {
        resizeMode: 'cover',
        width: '100%',
        height: 200,
        aspectRatio: 16 / 9,
    },
    articleContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },
    articleContent: {
        fontSize: 18,
        marginVertical: 16,
    }
});
