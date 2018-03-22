declare module 'react-native-swipe-list-view'
{
  import * as React from 'react';
  import { ViewStyle, ListViewProperties, FlatListProperties, ListRenderItem } from 'react-native';

  interface SwipeRow
  {
    closeRow: () => void;
  }

  export type RowsMap = { [ key: string ]: SwipeRow };

  type RowCallback<T> = ( key: string, rows: RowsMap ) => void;

  interface SwipeListViewProps<T> extends FlatListProperties<T>
  {
    data: T[];
    useFlatList?: boolean;
    style?: ViewStyle;

    /**
     * To render a custom ListView component, if you don't want to use ReactNative one.
     * Note: This will call `renderRow`, not `renderItem`
     * @deprecated
     */
    renderListView?: ( props: SwipeListViewProps<T>, setRefs: Function, onScroll: Function, renderRow: Function ) => React.ReactNode;

    /**
     * How to render a row in a FlatList. Should return a valid React Element.
     */
    // renderItem?: ( rowData: T ) => React.ReactNode;

    /**
     * How to render a hidden row in a FlatList (renders behind the row). Should return a valid React Element.
     * This is required unless renderItem is passing a SwipeRow.
     */
    renderHiddenItem?: ListRenderItem<T>;

    /**
     * [DEPRECATED] How to render a row in a ListView. Should return a valid React Element.
     * @deprecated
     */
    renderRow?: Function;

    /**
     * [DEPRECATED] How to render a hidden row in a ListView (renders behind the row). Should return a valid React Element.
     * This is required unless renderRow is passing a SwipeRow.
     * @deprecated
     */
    renderHiddenRow?: Function;

    /**
     * TranslateX value for opening the row to the left (positive number)
     */
    leftOpenValue?: number;

    /**
     * TranslateX value for opening the row to the right (negative number)
     */
    rightOpenValue?: number;

    /**
     * TranslateX value for stop the row to the left (positive number)
     */
    stopLeftSwipe?: number;

    /**
     * TranslateX value for stop the row to the right (negative number)
     */
    stopRightSwipe?: number;

    /**
     * Should open rows be closed when the listView begins scrolling
     */
    closeOnScroll?: boolean;

    /**
     * Should open rows be closed when a row is pressed
     */
    closeOnRowPress?: boolean;

    /**
     * Should open rows be closed when a row begins to swipe open
     */
    closeOnRowBeginSwipe?: boolean;

    /**
     * Disable ability to swipe rows left
     */
    disableLeftSwipe?: boolean;

    /**
     * Disable ability to swipe rows right
     */
    disableRightSwipe?: boolean;

    /**
     * Enable hidden row onLayout calculations to run always.
     *
     * By default, hidden row size calculations are only done on the first onLayout event
     * for performance reasons.
     * Passing ```true``` here will cause calculations to run on every onLayout event.
     * You may want to do this if your rows' sizes can change.
     * One case is a SwipeListView with rows of different heights and an options to delete rows.
     */
    recalculateHiddenLayout?: boolean;

    /**
     * Called when a swipe row is animating swipe
     */
    swipeGestureBegan?: RowCallback<T>;

    /**
     * Called when a swipe row is animating open
     */
    onRowOpen?: RowCallback<T>;

    /**
     * Called when a swipe row has animated open
     */
    onRowDidOpen?: RowCallback<T>;

    /**
     * Called when a swipe row is animating closed
     */
    onRowClose?: RowCallback<T>;

    /**
     * Called when a swipe row has animated closed
     */
    onRowDidClose?: RowCallback<T>;

    /**
     * Called when scrolling on the SwipeListView has been enabled/disabled
     */
    onScrollEnabled?: ( scrollEnabled: boolean ) => void;

    /**
     * Styles for the parent wrapper View of the SwipeRow
     */
    swipeRowStyle?: ViewStyle;

    /**
     * Called when the ListView (or FlatList) ref is set and passes a ref to the ListView (or FlatList)
     * e.g. listViewRef={ ref => this._swipeListViewRef = ref }
     */
    listViewRef?: React.Ref<SwipeListViewProps<T>>;

    /**
     * Should the row with this key do a slide out preview to show that the list is swipeable
     */
    previewRowKey?: string;

    /**
     * [DEPRECATED] Should the first SwipeRow do a slide out preview to show that the list is swipeable
     * @deprecated
     */
    previewFirstRow?: boolean;

    /**
     * [DEPRECATED] Should the specified rowId do a slide out preview to show that the list is swipeable
     * Note: This ID will be passed to this function to get the correct row index
     * https://facebook.github.io/react-native/docs/listviewdatasource.html#getrowidforflatindex
     * @deprecated
     */
    previewRowIndex?: number;

    /**
     * Duration of the slide out preview animation (milliseconds)
     */
    previewDuration?: number;

    /**
     * TranslateX value for the slide out preview animation
     * Default: 0.5 * props.rightOpenValue
     */
    previewOpenValue?: number;

    /**
     * Friction for the open / close animation
     */
    friction?: number;

    /**
     * Tension for the open / close animation
     */
    tension?: number;

    /**
     * The dx value used to detect when a user has begun a swipe gesture
     */
    directionalDistanceChangeThreshold?: number;

    /**
     * What % of the left/right openValue does the user need to swipe
     * past to trigger the row opening.
     */
    swipeToOpenPercent?: number;

    /**
     * Describes how much the ending velocity of the gesture affects whether the swipe will result in the item being closed or open.
     * A velocity factor of 0 means that the velocity will have no bearing on whether the swipe settles on a closed or open position
     * and it'll just take into consideration the swipeToOpenPercent.
     */
    swipeToOpenVelocityContribution?: number;

    /**
     * What % of the left/right openValue does the user need to swipe
     * past to trigger the row closing.
     */
    swipeToClosePercent?: number;
  }

  export class SwipeListView<T> extends React.Component<SwipeListViewProps<T>>
  {
  }
}
