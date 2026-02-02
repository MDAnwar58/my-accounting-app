<?php

namespace App\Models;

use Illuminate\Support\Facades\File;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;
    protected $table = 'accounts';
    protected $fillable = [
        'title',
        'amount',
        'price',
        'type',
        'date_time',
        'month_id',
        'year_id',
        'image',
    ];

    public static function fileStore($hasFile, $file, $requestFileName, $galleryFile)
    {
        if ($hasFile) {
            $fileName = basename($galleryFile);
            $file_path = public_path() . '/upload/account/images/' . $fileName;

            if (File::exists($file_path)) {
                File::delete($file_path);
            }
            $fileExtension = $file->getClientOriginalName();
            $filename = time() . "." . $fileExtension;
            $file->move('upload/account/images/', $filename);
            $path = url('/') . '/upload/account/images/' . $filename;
            return $path;
        } else {
            if ($galleryFile) {
                return $galleryFile;
            } else {
                return null;
            }
        }
    }

}
