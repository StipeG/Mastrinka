import { Observable } from 'rxjs/Observable';
/**
 * @name PhotoLibrary
 * @description
 * The PhotoLibrary plugin allows access to photos from device by url. So you can use plain img tag to display photos and their thumbnails, and different 3rd party libraries as well.
 * Saving photos and videos to the library is also supported.
 * cdvphotolibrary urls should be trusted by Angular. See plugin homepage to learn how.
 *
 * @usage
 * ```
 * import { PhotoLibrary } from 'ionic-native';
 *
 * PhotoLibrary.requestAuthorization().then(() => {
 *   PhotoLibrary.getLibrary().subscribe({
 *     next: library => {
 *       library.forEach(function(libraryItem) {
 *         console.log(libraryItem.id);          // ID of the photo
 *         console.log(libraryItem.photoURL);    // Cross-platform access to photo
 *         console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
 *         console.log(libraryItem.fileName);
 *         console.log(libraryItem.width);
 *         console.log(libraryItem.height);
 *         console.log(libraryItem.creationDate);
 *         console.log(libraryItem.latitude);
 *         console.log(libraryItem.longitude);
 *         console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
 *       });
 *     },
 *     error: err => {},
 *     complete: () => { console.log("could not get photos"); }
 *   });
 * })
 * .catch(err => console.log("permissions weren't granted"));
 *
 * ```
 */
export declare class PhotoLibrary {
    /**
     * Retrieves library items. Library item contains photo metadata like width and height, as well as photoURL and thumbnailURL.
     * @param options {GetLibraryOptions} Optional, like thumbnail size and chunks settings.
     * @return {Observable<LibraryItem[]>} Returns library items. If appropriate option was set, will be returned by chunks.
     */
    static getLibrary(options?: GetLibraryOptions): Observable<LibraryItem[]>;
    /**
     * Asks user permission to access photo library.
     * @param options {RequestAuthorizationOptions} Optional, like whether only read access needed or read/write.
     * @return { Promise<void>} Returns a promise that resolves when permissions are granted, and fails when not.
     */
    static requestAuthorization(options?: RequestAuthorizationOptions): Promise<void>;
    /**
     * Returns list of photo albums on device.
     * @return {Promise<AlbumItem[]>} Resolves to list of albums.
     */
    static getAlbums(): Promise<AlbumItem[]>;
    /**
     * @private
     */
    static getThumbnailURL(photoId: string, options?: GetThumbnailOptions): Promise<string>;
    /**
     * @private
     */
    static getThumbnailURL(libraryItem: LibraryItem, options?: GetThumbnailOptions): Promise<string>;
    /**
     * @private
     */
    static getPhotoURL(photoId: string, options?: GetPhotoOptions): Promise<string>;
    /**
     * @private
     */
    static getPhotoURL(libraryItem: LibraryItem, options?: GetPhotoOptions): Promise<string>;
    /**
     * @private
     */
    static getThumbnail(photoId: string, options?: GetThumbnailOptions): Promise<Blob>;
    /**
     * @private
     */
    static getThumbnail(libraryItem: LibraryItem, options?: GetThumbnailOptions): Promise<Blob>;
    /**
     * @private
     */
    static getPhoto(photoId: string, options?: GetPhotoOptions): Promise<Blob>;
    /**
     * @private
     */
    static getPhoto(libraryItem: LibraryItem, options?: GetPhotoOptions): Promise<Blob>;
    /**
     * Saves image to specified album. Album will be created if not exists.
     * LibraryItem that represents saved image is returned.
     * @param url {string} URL of a file, or DataURL.
     * @param album {AlbumItem | string} Name of an album or AlbumItem object.
     * @param options {GetThumbnailOptions} Options, like thumbnail size for resulting LibraryItem.
     * @return {Promise<LibraryItem>} Resolves to LibraryItem that represents saved image.
     */
    static saveImage(url: string, album: AlbumItem | string, options?: GetThumbnailOptions): Promise<LibraryItem>;
    /**
     * Saves video to specified album. Album will be created if not exists.
     * @param url {string} URL of a file, or DataURL.
     * @param album {AlbumItem | string} Name of an album or AlbumItem object.
     * @return {Promise<void>} Resolves when save operation completes.
     */
    static saveVideo(url: string, album: AlbumItem | string): Promise<void>;
}
export interface LibraryItem {
    /**
     * Local id of the photo
     */
    id: string;
    /**
     * URL of cdvphotolibrary schema.
     */
    photoURL: string;
    /**
     * URL of cdvphotolibrary schema.
     */
    thumbnailURL: string;
    fileName: string;
    width: number;
    height: number;
    creationDate: Date;
    latitude?: number;
    longitude?: number;
    albumIds?: string[];
}
export interface AlbumItem {
    /**
     * Local id of the album
     */
    id: string;
    title: string;
}
export interface GetLibraryOptions {
    thumbnailWidth?: number;
    thumbnailHeight?: number;
    quality?: number;
    itemsInChunk?: number;
    chunkTimeSec?: number;
    useOriginalFileNames?: boolean;
    includeAlbumData?: boolean;
}
export interface RequestAuthorizationOptions {
    read?: boolean;
    write?: boolean;
}
export interface GetThumbnailOptions {
    thumbnailWidth?: number;
    thumbnailHeight?: number;
    quality?: number;
}
export interface GetPhotoOptions {
}
