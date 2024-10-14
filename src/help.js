export function printHelp() {
    console.log(`
    Available commands:
    -------------------
    Navigation & File Management:
    cd <path_to_directory>   - Change directory to the specified path
    ls                       - List all files and directories in the current directory
    add <new_file_name>       - Create an empty file in the current working directory
    rn <path_to_file> <new_filename> - Rename file, keeping content unchanged
    cp <path_to_file> <path_to_new_directory> - Copy file to a new directory
    mv <path_to_file> <path_to_new_directory> - Move file to a new directory (removes original)
    rm <path_to_file>         - Delete the specified file
    cat <path_to_file>        - Read and print the content of a file

    OS Info:
    os --EOL                 - Get system's default End-Of-Line marker
    os --cpus                - Get info about CPUs (model, speed in GHz)
    os --homedir             - Get the home directory
    os --username            - Get the current system user name
    os --architecture        - Get CPU architecture

    Hash Calculation:
    hash <path_to_file>       - Calculate and print the hash for a file

    Compression/Decompression:
    compress <path_to_file> <path_to_destination> - Compress file using Brotli algorithm
    decompress <path_to_file> <path_to_destination> - Decompress file using Brotli algorithm

    Other:
    .exit                    - Exit the file manager
    help                     - Show this help message
  `);
}