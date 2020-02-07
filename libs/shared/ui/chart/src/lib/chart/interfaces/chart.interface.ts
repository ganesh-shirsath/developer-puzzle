import { IChartOptions } from '../interfaces/chart-options.interface';

/**
 * chart interface
 */
export interface IChartData {
    title: string,
    type: string,
    data: any[],
    columnNames: string[],
    options: IChartOptions
}
