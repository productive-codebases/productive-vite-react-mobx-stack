/* tslint:disable */
/* eslint-disable */
/**
 * UserResource
 * Get users
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Role
 */
export interface Role {
    /**
     * 
     * @type {string}
     * @memberof Role
     */
    roleId: string;
    /**
     * 
     * @type {string}
     * @memberof Role
     */
    name: RoleNameEnum;
}

/**
* @export
* @enum {string}
*/
export enum RoleNameEnum {
    Administrator = 'administrator',
    Reader = 'reader',
    Writer = 'writer'
}

export function RoleFromJSON(json: any): Role {
    return RoleFromJSONTyped(json, false);
}

export function RoleFromJSONTyped(json: any, ignoreDiscriminator: boolean): Role {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'roleId': json['role_id'],
        'name': json['name'],
    };
}

export function RoleToJSON(value?: Role | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'role_id': value.roleId,
        'name': value.name,
    };
}

