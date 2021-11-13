/**
 * Config interface
 * @interface
 * @category logger
 */
export interface IConfig {
	MIN_LEVEL_CONSOLE: string;
	EXIT_ON_ERROR: boolean;
	HANDLE_EXCEPTIONS: boolean;
	LABEL: string;
	TIMESTAMP_FORMAT: string;
}
