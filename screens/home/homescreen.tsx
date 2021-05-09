import React from 'react';
import { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Article } from '../../data/article';
import { RouteData } from '../details/detailsscreen';

type State = {
    isLoading: boolean,
    articles?: any,
}

type Props = {
    navigation?: any, // injected by RN
}

export class HomeScreen extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            articles: null,
        }
        this.fetchNewsItems();
    }

    private async fetchNewsItems() {
        const apiKey = "261be8777683436f844b0af5ab6b3b47";
        const country = "us";
        const response: any = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`);
        const responseJson = await response.json();

        this.setState({
            isLoading: false,
            articles: responseJson.articles
        })
    }

    render() {
        const { isLoading, articles } = this.state;
        const { navigation } = this.props;
        if (isLoading) {
            return (
                <Text>
                    Loading...
                </Text>
            );
        }
        return (
            <View style={styles.homeContainer}>
                <ScrollView>
                    {articles.map((article: Article) =>
                        this.articleText(article, navigation))
                    }
                </ScrollView>
            </View>
        );
    }

    private articleText = (article: Article, navigation: any) => {
        return (
            <TouchableOpacity onPress={() => {
                this.onArticleClick(article, navigation)
            }} key={article.url}>
                <View style={styles.articleContainer}>
                    <Image
                        source={{
                            uri: article.urlToImage,
                        }}
                        style={{ width: 96, height: 96, resizeMode: 'cover' }}
                    />
                    <Text numberOfLines={3} style={styles.title}>
                        {article.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    private onArticleClick = (article: Article, navigation: any) => {
        const routeData: RouteData = {
            article: article,
        }
        navigation.push("details", routeData);
    }
}

const styles = StyleSheet.create({
    homeContainer: {
        backgroundColor: "#fafafa",
    },
    articleContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },
    title: {
        flexShrink: 1,
        marginHorizontal: 16,
        fontSize: 20,
    }
});
