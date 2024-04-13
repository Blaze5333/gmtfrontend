/*eslint-disable*/
import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Pagination from '../components/Pagination';
import SplashScreen from '../components/SplashScreen';
import SplashScreen2 from '../components/SplashScreen2';
import SplashScreen3 from '../components/SplashScreen3';

const SplashScr = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slides=[<SplashScreen/>,<SplashScreen2/>,<SplashScreen3/>]
  const flatListRef = useRef(null);
  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ index, animated: true });
  };
  const Slides=[
  {item:<SplashScreen data={slides} id={1} onScroll={scrollToIndex} scrollX={scrollX} navigation={navigation} index={index}/>,id:1},
  {item:<SplashScreen2 data={slides} id={2} onScroll={scrollToIndex} scrollX={scrollX} navigation={navigation} index={index}/>,id:2},
  {item:<SplashScreen3 data={slides} id={1} onScroll={scrollToIndex} scrollX={scrollX} navigation={navigation} index={index}/>,id:3},

]

  return (
    <View>
      <FlatList
        data={Slides}
        renderItem={({item}) => item.item}
        keyExtractor={item => item.id}
        ref={flatListRef}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

export default SplashScr;