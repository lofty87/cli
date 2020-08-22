/**
 * * kakao.map 사용에 필요한 것들만 임시로 정의
 */
declare namespace kakao {
  namespace maps {
    export type Container = HTMLElement | null;

    export enum ControlPosition {
      TOP,
      TOPRIGHT,
      BOTTOMLEFT,
      BOTTOM,
      BOTTOMRIGHT,
      LEFT,
      RIGHT,
    }

    export type Options = {
      center: LatLng;
      level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    };

    export class LatLng {
      constructor(private latitude: number, private longitude: number) {}
    }

    export class MapTypeControl {
      constructor();
    }

    export class Map {
      constructor(private container: Container, private options: Options) {}

      public addControl(mapTypeControl: MapTypeControl, controlPosition: ControlPosition): void;
    }

    export class Size {
      constructor(private width: number, private height: number) {}
    }

    export class MarkerImage {
      constructor(private src: stirng, private size: Size) {}
    }

    export class Marker {
      constructor(private options: { position: LatLng; title: string });

      public setMap(map: Map): void;

      public setImage(image: MarkerImage): void;
    }

    export class CustomOverlay {
      constructor(private options: { position: LatLng; content: string; zIndex: number }) {}

      public setMap(map: Map): void;
    }

    export class InfoWindow {
      constructor(private options: { position: LatLng; content: string });

      public open(map: Map, marker: Marker): void;
    }
  }
}
